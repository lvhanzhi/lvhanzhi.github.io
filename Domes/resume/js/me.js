var $peopleContainer = $('#people-container');
var $people = $('.people');
var $blocks = $('.block');
// 获取容器高度
var contentHeight = $('.content').height();

// 动作常量
var actionFrameMap = {
  static: 0,
  walk: 1,
  stand: 2,
  jump: 3,
};

var Me = {
  init: function() {
    this.direction = 'right';
    this.oneFrameSize = 200; // 每个动作图片的尺寸
    this.oneFrameDuration = 200; // 每个动作的间隔
    this.jumpBuffer = 150; // 跳跃高度差
    this.peopleBottomEdge = 70; // 人物距离底部距离
    this.peopleRightEdge = 150; // 人物右边距离边界距离
    this.peopleLeftEdge = 80; // 人物左边距离边界距离
  },
  /**
   * 更新方向
   * @param {Number} distant 滚动位移大小
   */
  setDirection: function(distant) {
    if (distant > 0) {
      this.direction = 'right';
      $people.css('top', 0);
    } else {
      this.direction = 'left';
      $people.css('top', '-200px');
    }
  },

  /**
   * 设置帧图片
   */
  setFrame: function (action) {
    console.log('frame:',action);
    var nextFrameLeft = - actionFrameMap[action] * this.oneFrameSize;
    $people.css({
      left: nextFrameLeft,
    })
  },

  /**
   * 切换人物动作帧
   */
  switchFrames: function(frames, callback) {
    var self = this;
    
    // 如果没有下一帧
    if (frames.length === 0 || !frames[0]) {
      callback();
      return;
    }
    
    // 获取下一帧
    var nextAction = frames.shift();
    
    this.setFrame(nextAction);
    
    // 间隔后，切换下一个
    this.shiftFrameTimer = setTimeout(function() {
      self.switchFrames(frames, callback);
    }, this.oneFrameDuration);
  },

  /**
   * 人物行走
   */
  walk: function() {
    var self = this;
    // 如果已经移动，则不添加
    if (this.isJumping || this.isMoving) {
      return;
    }
    this.isMoving = true;
    // 设置一帧动作
    var nextFrames = ['static', 'walk', 'stand'];
    this.switchFrames(nextFrames, function() {
      self.isMoving = false;
    });
  },

  /**
   * 人物跳跃
   * @param {Dom} item 对比障碍物
   * @param {Boolean} downBlock 是否需要落到障碍物
   */
  jump: function(item, downBlock) {
    var self = this;
    this.setFrame('jump');

    this.isJumping = true;

    var bottom = contentHeight - item.offsetTop + this.jumpBuffer;
    $peopleContainer.stop().animate({
      bottom: bottom
    }, 200, function() {
      downBlock && self.downBlock(item);
    });
  },

  /**
   * 降落到指定障碍物
   */
  downBlock: function(item) {
    var self = this;
    // 下降高度，需要注意图片的边距，这里需要多减 14
    var bottom = contentHeight - item.offsetTop - 14;
  
    $peopleContainer.stop().animate({
      bottom: bottom
    }, 200, function() {
      // 切换状态
      self.setFrame('static');
      self.isJumping = false;
    });
  },

  /**
   * 下降函数
   */
  drop: function(item) {
    var self = this;
    self.setFrame('jump');
    
    $peopleContainer.stop().animate({
        bottom: this.peopleBottomEdge,
    }, 200, function() {
      // 切换状态
      self.setFrame('static');
      self.isJumping = false;
    });
  },

  /**
   * 判断是否即将接触到障碍物
   */
  checkJump: function(curPosition, prePosition) {
    var self = this;

    // 遍历所有的障碍物，判断是否需要跳跃
    for (var i = 0, len = $blocks.length; i < len; i++) {
      var item = $blocks[i];
      // 获取元素的位置和宽度
      var itemX = item.offsetLeft; 
      var itemWidth = item.offsetWidth;

      // 判断是否需要跳
      var rightNeedJump = (prePosition + this.peopleRightEdge <= itemX) && (curPosition + this.peopleRightEdge > itemX);
      var leftNeedJump = (prePosition + this.peopleLeftEdge >= itemX + itemWidth) && (curPosition + this.peopleLeftEdge < itemX + itemWidth);
      
      // 如果需要跳跃
      if (rightNeedJump || leftNeedJump) {
        var needDownBlock = curPosition > itemX - this.peopleRightEdge && curPosition < itemX + itemWidth - this.peopleLeftEdge;
        // 判断是否会落在障碍物
        this.jump(item, needDownBlock);
      }

      // 判断是否是在障碍物上，然后需要从障碍物落下
      var rightNeedFall = (prePosition + this.peopleLeftEdge <= itemX + itemWidth) && (curPosition + this.peopleLeftEdge > itemX + itemWidth);
      var leftNeedFall = (prePosition + this.peopleRightEdge > itemX) && (curPosition + this.peopleRightEdge) <= itemX;
      
      // 如果需要落下障碍物
      if (rightNeedFall || leftNeedFall) {
        this.drop(item);
      }
    }
  }
};