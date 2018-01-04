var $scenseHorizontal = $('.layer-horizontal');
var $cloud = $scenseHorizontal.find('.cloud');
var $mountain = $scenseHorizontal.find('.mountain');

/**
 * 场景对象 Scense
 */
var Scense = {
  computeWidth: function() {
    return $scenseHorizontal.width() - $('.content').width();
  },
  /**
   * 背景移动层次感
   */
  move: function(currPos) {
    // 整体场景向左移动
    $scenseHorizontal.css({
      left: -currPos
    });
    // 山比较远，因此只移动 1 - 0.75 = 0.25
    $mountain.css({
      left: currPos * 0.75
    });
    // // 云更远，因此只移动 1 - 0.95 = 0.05
    $cloud.css({
      left: currPos * 0.95
    });
    
  },
};