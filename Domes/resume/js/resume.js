/**
 * 移动简历
 */
var $window = $(window);
var loading = $('.loading');
var intro = $('.intro');
var containerPage = $('#page');

var images = [
  './images/people.png',
  './images/mountain.png',
  './images/cloud.png',
  './images/background.png',
  './images/pipe.png',
  './images/trees.png',
  './images/project.png',
  'https://p.qpic.cn/qqconadmin/0/5f0034fb4ebb4bc4b7fd44acc087c61b/0',
  'https://p.qpic.cn/qqconadmin/0/0ae6340cbf0243b0be1784d5746e22cd/0?tp=webp',
  'https://p.qpic.cn/qqconadmin/0/2739451893134a1cbb300dd2e52083be/0?tp=webp'
];

var Resume = {
  /**
   * 初始化操作-页面入口
   */
  init: function() {
    var self = this;
    // 初始化其他组件
    Me.init();
    // 页面滚动最开始
    $(window).scrollTop(0);
   
    // 加载资源
    resourceHelper.load(images, function(result) {
      // 去除loading
      loading.fadeOut();
      // 绑定事件
      self.bindEvent();
    });
  },
  /**
   * 事件绑定
   */
  bindEvent: function() {
    var self = this;
    var curPosition = 0; // 当前位置
    var prePosition = 0; // 之前位置
    
    // 监听滚动事件
    $window.on('scroll', function(e) {
      // 设置当前页面滚动位置
      curPosition =  $window.scrollTop();
      // 计算移动距离
      var distant = curPosition - prePosition;
      // console.log(distant);
      // 更新人物状态
      Me.setDirection(distant);
      // 背景移动
      Scense.move(curPosition);
      // 判断是否跳跃
      Me.checkJump(curPosition, prePosition);
      // 人物走
      Me.walk();
    
      // 更新 prePosition
      prePosition = curPosition;
    });

    // 开始建立按钮
    $window.on('click', '.js-start-resume', function() {
      intro.hide();
      containerPage.css({
        height: Scense.computeWidth()
      });
    });

    // 当修改浏览器窗口大小的时候，需要重新设置
    $window.on('resize', function() {
      containerPage.css({
        height: Scense.computeWidth()
      });
    });
  }
};

// 页面初始化
Resume.init();