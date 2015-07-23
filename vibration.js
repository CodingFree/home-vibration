(function () {

    function vibrator() {
        this._started = false;
        vibrator.prototype.start();

    }
    vibrator.prototype = {

        /**
         * Start to handle screenshot events.
         * @memberof Screenshot.prototype
         */
        start: function () {
            if (this._started) {
                throw 'Instance should not be start()\'ed twice.';
            }
            this._started = true;

            window.addEventListener('mozChromeEvent', this);
        },

        /**
         * Stop handling screenshot events.
         * @memberof Screenshot.prototype
         */
        stop: function () {
            if (!this._started) {
                throw 'Instance was never start()\'ed but stop() is called.';
            }
            this._started = false;

            window.removeEventListener('mozChromeEvent', this);
        },
        handleEvent: function (evt) {
            var lock = navigator.mozSettings.createLock();
            var result = lock.set({
                'keyboard.vibration': false
            });

            result.onsuccess = function () {
                console.log("the vibration has been changed");
            }

            result.onerror = function () {
                console.log("An error occure, the vibration remain unchanged");
            }
            
            navigator.mozSettings.addObserver('keyboard.vibration', function (e) {
              var result = lock.set({
                  'keyboard.vibration': false
              });
            };
        }

    };

    var vibrator = new vibrator();
}());