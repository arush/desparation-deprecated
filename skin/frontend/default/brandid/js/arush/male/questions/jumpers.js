// Generated by CoffeeScript 1.3.3
(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.maleJumpersHoodiesQ = function() {
    var buttons, jumperBut1, jumperBut2, q;
    wipeConsole();
    saveProgress("maleJumpersHoodiesQ");
    q = "I've hacked the Hubble Telescope and am pointing it towards Earth. I can see a storm system over New York, a neglected helium balloon with a Red Bull logo, and boy is it going to be cold in the UK this winter. \n\nLooks like you'll need something warm. Do you want a jumper or a hoodie? ";
    newQ(q);
    typeit();
    jumperBut1 = ["smalltext convert", "Jumper<br/><span class=\"button-caption\">A hoodie won't match my shirts</span>", "maleJumpersHoodiesAa()"];
    jumperBut2 = ["smalltext convert", "Hoodie<br/><span class=\"button-caption\">Two words: Mark. Zuckerberg.</span>", "maleJumpersHoodiesAb()"];
    buttons = [jumperBut1, jumperBut2];
    return setTimeout((function() {
      return insertButtons(buttons, "#male-welcome-msg");
    }), 3500);
  };

  root.maleJumpersHoodiesDone = function() {
    _kmq.push([
      "record", "MALE Jumpers Hoodies", {
        jumpersHoodies: punter.jumpersHoodiesA
      }
    ]);
    mixpanel.track("MALE Jumpers or Hoodies", {
      jumpersHoodies: punter.jumpersHoodiesA
    });
    return maleJumpersPriceQ();
  };

  root.maleJumpersHoodiesAa = function() {
    punter.jumpersHoodiesA = 'Jumpers';
    return maleJumpersHoodiesDone();
  };

  root.maleJumpersHoodiesAb = function() {
    punter.jumpersHoodiesA = 'Hoodies';
    return maleJumpersHoodiesDone();
  };

  root.maleJumpersPriceQ = function() {
    var buttons, jumperBut1, jumperBut2, q;
    wipeConsole();
    saveProgress("maleJumpersPriceQ");
    q = "How much do you want to spend? ";
    newQ(q);
    typeit();
    jumperBut1 = ["smalltext convert", "£30<br/><span class=\"button-caption\">Value brands, lighter material</span>", "maleJumpersPriceAa()"];
    jumperBut2 = ["smalltext convert", "£80<br/><span class=\"button-caption\">Premium brands, heavier and warmer</span>", "maleJumpersPriceAb()"];
    buttons = [jumperBut1, jumperBut2];
    return setTimeout((function() {
      return insertButtons(buttons, "#male-welcome-msg");
    }), 1500);
  };

  root.maleJumpersPriceDone = function() {
    _kmq.push([
      "record", "MALE Jumpers Price", {
        jumpersPrice: punter.jumpersPriceA
      }
    ]);
    mixpanel.track("MALE Jumpers Price", {
      jumpersPrice: punter.jumpersPriceA
    });
    return maleJumpersBrandsQ();
  };

  root.maleJumpersPriceAa = function() {
    punter.jumpersPriceA = 'value';
    return maleJumpersPriceDone();
  };

  root.maleJumpersPriceAb = function() {
    punter.jumpersPriceA = 'premium';
    return maleJumpersPriceDone();
  };

  root.maleJumpersBrandsQ = function() {
    var buttons, jumperBut1, q;
    wipeConsole();
    saveProgress("maleJumpersBrandsQ");
    q = "Complete the sentence:\n\nI want my " + punter.jumpersHoodiesA.toLowerCase() + " from brands or shops like ___________ ";
    newQ(q);
    typeit();
    jumperBut1 = ["smalltext convert secondary", "I don't care<br/><span class=\"button-caption\">We'll call you after checkout anyway</span>", "maleJumpersBrandsAa()"];
    buttons = [jumperBut1];
    return insertBrandsField();
  };

  root.maleJumpersBrandsDone = function() {
    return maleJumpersFinishedQ();
  };

}).call(this);
