$(function () {

	var s
	
	$(".search_btn").click(function() {
		
		var tweetsearch = $("#text_phrase-input").val();
	
	s = new Spotter("twitter.search", 
						{q:tweetsearch, period:10},
						{buffer:true, bufferTimeout:15}
					    );
	
	
	s.register(function(tweet) {

	s.stop();
			
	// Code Below comes from 10k.aneventapart.com/2/Uploads/506/ with changes for my usage.
	// This is for a school project and will not be used in anyway to make a profit
	
	$(function() {
		phrase = false
		val = tweet.text
		phrase = new Phrase($('#phrase-module'), val);
		$(window).scrollTop();
		$('body, html').animate({scrollTop: $(this).offset()}, 500);
	});



	
	function Phrase($elem, phrase) {
		var self = this;
		this.$phrase = $elem.find('.phrase');
		this.$pattern = $elem.find('.pattern');
		this.$legend = $elem.find('.legend');
		this.$stats = $elem.find('.stats');
		this.phrase = $.trim(phrase);
		this.getData = function() {
			this.phrase_length = this.phrase.length;
			this.word_count = this.phrase.split(/\s+/).length;
			this.letter_count = 0;
			this.vowel_count = 0;
			this.conso_count = 0;
			this.letters = [];
			var l, counts = [], alphabet = 'abcdefghijklmnopqrstuvwxyz', vowels = 'aeiou';
			for (var i = 0, len = this.phrase.length; i < len; i++) {
				l = this.phrase.charAt(i).toLowerCase();
				if (alphabet.indexOf(l) > -1) {
					this.letter_count++;
					this._countLetter(this.phrase.charAt(i).toLowerCase());
					if (vowels.indexOf(l) > -1) {
						this.vowel_count++;
					} 
					else {
						this.conso_count++;
					}
				}
			}
			this.letters.sort(function(a, b) {
				if ((a.count * 1) < (b.count * 1)) {
					return 1;
				} 
				else if ((a.count * 1) > (b.count * 1)) {
					return -1;
				} 
				else if (self.phrase.toLowerCase().indexOf(a.letter) < self.phrase.toLowerCase().indexOf(b.letter)) {
					return -1;
				} 
				else if (self.phrase.toLowerCase().indexOf(a.letter) > self.phrase.toLowerCase().indexOf(b.letter)) {
					return 1;
				}
				return 0;
			});
			this._setPercentages();
		};
    this._countLetter = function(letter) {
        for (var i = 0, len = this.letters.length; i < len; i++) {
            if (this.letters[i].letter === letter) {
                this.letters[i].count++;
                return;
            }
        }
        this.letters.push({letter: letter,count: 1});
        return;
    };
    this._setPercentages = function() {
        for (var i = 0, len = this.letters.length; i < len; i++) {
            this.letters[i].percentage = Math.round((this.letters[i].count / this.letter_count) * 100);
        }
    };
    this.drawPattern = function() {
        this._circle_id = 0;
        this._circles = [];
        var circle, color, radius, max_p, rel_p;
        this.$pattern.css('height', this.$pattern.width());
        this.$pattern.html('').append($('<canvas width="' + this.$pattern.css('height') + '" height="' + this.$pattern.css('width') + '"></canvas>'));
        this.ctx = this.$pattern.children('canvas').get(0).getContext('2d');
        for (var i = 0, len = this.letters.length; i < len; i++) {
            if (!max_p) {
                max_p = this.letters[i].percentage;
            }
            rel_p = Math.round((this.letters[i].percentage / max_p) * 100);
            radius = Math.floor(this.$pattern.width() * (rel_p / 100) / 2);
            radius = (i === 0 || this._circles[i - 1].radius > radius) ? radius : this._circles[i - 1].radius - 3;
            circle = new Circle(this, radius, this.letters[i].letter);
            circle.draw();
            this._circles.push(circle);
        }
    };
    this.makeLegend = function() {
        this.$legend.html('');
        for (var i = 0, len = this.letters.length; i < len; i++) {
            $('<li class="leg-' + this.letters[i].letter + '"><span class="letter">' + this.letters[i].letter + '</span><span class="count">' + this.letters[i].count + '</span><span class="percentage">' + this.letters[i].percentage + '</span>%</li>').appendTo(this.$legend);
        }
    };
    this.makeStats = function() {
        this.$stats.html('');
        $('<li><span class="count">' + this.letter_count + '</span> letters</li>').appendTo(this.$stats);
        $('<li><span class="count">' + this.vowel_count + '</span> vowels</li>').appendTo(this.$stats);
        $('<li><span class="count">' + this.conso_count + '</span> consonants</li>').appendTo(this.$stats);
        $('<li><span class="count">' + this.word_count + '</span> words</li>').appendTo(this.$stats);
        $('<li><span class="count">' + this.phrase_length + '</span> characters</li>').appendTo(this.$stats);
    };
    this.makeImage = function() {
        var img = this.$pattern.children('canvas').get(0).toDataURL(), embed = '<img src="' + img + '" alt="" />';
        this.$pattern.html(embed + '<p>Right click and save, or embed as a data URL: <input type="text" name="embed-code" id="embed-code" /></p>').css('height', 'auto');
        $('#embed-code').val(embed);
    };
    $('#phrase-module').css({position: 'absolute',left: -9999,display: 'block'});
    this.getData();
    this.$phrase.text(phrase);
    this.drawPattern();
    this.makeImage();
    this.makeLegend();
    this.makeStats();
    $('#phrase-module').css({position: 'relative',left: 0,display: 'none'}).fadeIn(600);
	
	}
	function Circle(phrase, radius, letter) {
		this.phrase = phrase;
		this.id = phrase._circle_id;
		phrase._circle_id++;
		this.radius = radius;
		var $temp = $('<div class="' + letter + '" style="display:none;"></div>').appendTo('body');
		this.color = $temp.css('background-color');
		$temp.remove();
		this.draw = function() {
			var ctx = this.phrase.ctx, xy = this.phrase.$pattern.width() / 2;
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(xy, xy, this.radius, 0, 360, false);
			ctx.closePath();
			ctx.fill();
		};
	}
	}); //ENDS s.register(function(tweet)
	
	s.start();
	
	});
});

