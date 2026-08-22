document.addEventListener('DOMContentLoaded', function () {
    const reservationForms = document.querySelectorAll('.reservationForm');

    const itemsData = {
        "Treinlunch": {
            "1": "https://www.ing.nl/payreq/m/?trxid=0MShhGm8hDCt6v94r46qjRjuG5FFGV9a",
            "2": "https://www.ing.nl/payreq/m/?trxid=EK1VLCvKfeHpUjtrUCmMNd76YfdE2O8M",
            "3": "https://www.ing.nl/payreq/m/?trxid=I6BMC3dIcObXHHd1RfFM0QMOjzxZiE0n",
            "4": "https://www.ing.nl/payreq/m/?trxid=PR6oK0DhfJvvJXnGTtiqT8OQJmZLstE7"
        },
        "DisneySea": {
            "1": "https://www.ing.nl/payreq/m/?trxid=9y065SEdwWObjpJlp9fU8Bxqnj4sWQzz",
            "2": "https://www.ing.nl/payreq/m/?trxid=9MIKYMGMGtk0jlfN0I9siPIQbdg31qIQ"
        },
        "Kaiseki": {
            "1": "https://www.ing.nl/payreq/m/?trxid=8udp40QVpfGn4W4NLwlJLDcbFGUDPUmv",
            "2": "https://www.ing.nl/payreq/m/?trxid=Ip3svk5gmNeLB25pciymVOPWos6ZBLDA"
        },
        "Universal": {
            "1": "https://www.ing.nl/payreq/m/?trxid=SlrBVn2npmjV05R5f5zUBXeJSM4RbhtQ",
            "2": "https://www.ing.nl/payreq/m/?trxid=49x08yoQlAKdTyhmCenljEzF0Bd3PiTH"
        },
        "Karaoke": {
            "1": "https://www.ing.nl/payreq/m/?trxid=YTk48H8gnYzc9Y2vINk2wuSlWZoUqr8U",
            "2": "https://www.ing.nl/payreq/m/?trxid=dZ2kdVzzpUWDzOr9zQd17BwGapl5PsCh"
        },
        "Koffie": {
            "1": "https://www.ing.nl/payreq/m/?trxid=NfEeT75S5zXwR8xGRkIH57UwaEBf9EqF",
            "2": "https://www.ing.nl/payreq/m/?trxid=mwPleXSQThGrtStQlOU7NXjnYHgViOSH"
        },
        "Internationaalrijbewijs": {
            "1": "https://www.ing.nl/payreq/m/?trxid=bxH0xNGDjNE6OTHib95IxIywtvpi38su",
            "2": "https://www.ing.nl/payreq/m/?trxid=m6d00uyUq99pgNKI41AEGui6qvyH659g"
        },
        "karten": {
            "1": "https://www.ing.nl/payreq/m/?trxid=XQTNS0AgulErda4Y0vVuz04LOpJisayr",
            "2": "https://www.ing.nl/payreq/m/?trxid=xndqHOGZWs0vsNbLVX3hGDfyxx3urw4m"
        },
        "Disneyland": {
            "1": "https://www.ing.nl/payreq/m/?trxid=sdpf1NEx5RfLRI3TTGC4JGKLv7evDiBo",
            "2": "https://www.ing.nl/payreq/m/?trxid=hb9aubUMnacyyaVQam6k4BQaE3jIW5HR"
        },
        "teamlab": {
            "1": "https://www.ing.nl/payreq/m/?trxid=1aN3Qo4YfcuW53DD06UmpUQfFJ6kjirC",
            "2": "https://www.ing.nl/payreq/m/?trxid=w1oLQYEDlEOXmNuYilnLjqOC2xZ3gqV5"
        },
        "Cracker": {
            "1": "https://www.ing.nl/payreq/m/?trxid=1qiyFr6EeWBIiZOla5PH2PUHaIADEBjr",
            "2": "https://www.ing.nl/payreq/m/?trxid=y4qvpUCqq5AFYtfMiqjz32q8YUkjFz1q",
            "3": "https://www.ing.nl/payreq/m/?trxid=ViGP8u1tNdElK7ZM5k1Lrp1nP6J4FMgf"    
        },
        "Reistegoed": {
            "1": "https://www.ing.nl/payreq/m/?trxid=dNNbhXAWI7OCp8rm8tFlnfJr6WuIPdny",
            "2": "https://www.ing.nl/payreq/m/?trxid=OoY6LSf0ARAFfL94AFCNiY10GDgC8B3K",
            "3": "https://www.ing.nl/payreq/m/?trxid=q3AzWSwqxDvmZQdR4tVBe6fwZBIyg3Mt",
            "4": "https://www.ing.nl/payreq/m/?trxid=OoY6LSf0ARAFfL94AFCNiY10GDgC8B3K",
            "5": "https://www.ing.nl/payreq/m/?trxid=OoY6LSf0ARAFfL94AFCNiY10GDgC8B3K",
            "6": "https://www.ing.nl/payreq/m/?trxid=OoY6LSf0ARAFfL94AFCNiY10GDgC8B3K",
            "7": "https://www.ing.nl/payreq/m/?trxid=OoY6LSf0ARAFfL94AFCNiY10GDgC8B3K",
            "8": "https://www.ing.nl/payreq/m/?trxid=OoY6LSf0ARAFfL94AFCNiY10GDgC8B3K",
            "9": "https://www.ing.nl/payreq/m/?trxid=OoY6LSf0ARAFfL94AFCNiY10GDgC8B3K",
            "10": "https://www.ing.nl/payreq/m/?trxid=OoY6LSf0ARAFfL94AFCNiY10GDgC8B3K",
            "11": "https://www.ing.nl/payreq/m/?trxid=OoY6LSf0ARAFfL94AFCNiY10GDgC8B3K",
            "12": "https://www.ing.nl/payreq/m/?trxid=OoY6LSf0ARAFfL94AFCNiY10GDgC8B3K",
            "13": "https://www.ing.nl/payreq/m/?trxid=OoY6LSf0ARAFfL94AFCNiY10GDgC8B3K",
            "14": "https://www.ing.nl/payreq/m/?trxid=OoY6LSf0ARAFfL94AFCNiY10GDgC8B3K",
            "15": "https://www.ing.nl/payreq/m/?trxid=OoY6LSf0ARAFfL94AFCNiY10GDgC8B3K",
            "16": "https://www.ing.nl/payreq/m/?trxid=OoY6LSf0ARAFfL94AFCNiY10GDgC8B3K"
        },
        "uitkijktoren": {
            "1": "https://www.ing.nl/payreq/m/?trxid=l8Wx09tHHGw3efX2w1zJAvffbiDjEU3e",
            "2": "https://www.ing.nl/payreq/m/?trxid=Ezz5SUgrsytbEK2gEdOI3Gu8IYk8GY9U",
        },
        "esim": {
            "1": "https://www.ing.nl/payreq/m/?trxid=ZMZewYqTzuJITMumEc7brgOtUemBOIen",
        },
        "borderless": {
            "1": "https://www.ing.nl/payreq/m/?trxid=ZBYOvZzqPywueI2ALo9LdyHiv8y3qVDd",
            "2": "https://www.ing.nl/payreq/m/?trxid=IOVET6Uy63Dhi6FAMeq7KixtVYrBlgs6"
        },
        "thee": {
            "1": "https://www.ing.nl/payreq/m/?trxid=s8JzG6CNafL24GmLdkAg6okd4MQChq6w",
            "2": "https://www.ing.nl/payreq/m/?trxid=0rAhRzIlFYToCDE1N3sG1J4eaLqW2m13"
        },
        "samurai": {
            "1": "https://www.ing.nl/payreq/m/?trxid=aisDprgSfbD1lrFZVLvaBjZt1eVa6gBa",
            "2": "https://www.ing.nl/payreq/m/?trxid=MZa9w0SRsmnYVSbJMQNTtgtAmbztBtRd"
        },
        "moonflower": {
            "1": "https://www.ing.nl/payreq/m/?trxid=t8YL5m0jBb6o31GFCm7k8Ytg4ASoxHT9",
            "2": "https://www.ing.nl/payreq/m/?trxid=MINCyb47uAScZiu9jDFRrHV4qJpj9atV"
        },
        "line": {
            "1": "https://www.ing.nl/payreq/m/?trxid=UV4dRue3jgx3Ham35NphxN7sCZ9HLegc",
            "2": "https://www.ing.nl/payreq/m/?trxid=YJn7wx9QGW5PUPnNokj6ipWN1m4dbX54"
        },
    };

    reservationForms.forEach((reservationForm, index) => {
        const quantityAvailableElement = reservationForm.querySelector('.quantityAvailable');
        const registerDiv = reservationForm.querySelector('.register');
        const giftName = registerDiv.getAttribute('data-gift-name');
        updateItemQuantity(quantityAvailableElement, giftName, reservationForm, index);

        reservationForm.addEventListener('submit', function (event) {
            event.preventDefault();

        const usernameInput = reservationForm.querySelector('.username');
        const username = usernameInput.value; 
            fetchQuantityAvailable(giftName) // Updated: Fetch quantityavailable before sending data to server
            .then(data => {
                sendDataToServer(username, giftName, quantityAvailableElement, reservationForm, data.quantityAvailable);
            })
            .catch(error => {
                console.error('Error fetching quantity available:', error);
            });
    });

const targetGiftNames = ["DisneySea", "Universal", "Karaoke", "Koffie", "karten", "Disneyland", "teamlab", "kimono", "Internationaalrijbewijs", "Kaiseki" , 
"Cracker", "Treinlunch", "Reistegoed", "borderless", "uitkijktoren","esim","thee","samurai", "moonflower", "line" ];
    targetGiftNames.forEach((targetGiftName) => {
        const registerElement = document.querySelector(`.register[data-gift-name="${targetGiftName}"]`);
if (registerElement) {
    const reservationForm = registerElement.closest('.reservationForm');
    if (reservationForm) {
        const reservationFormId = reservationForm.id;
        const index = parseInt(reservationFormId.match(/\d+/)[0]);
        const quantitySelect = reservationForm.querySelector('select');
              quantitySelect.addEventListener('change', function() {
        const selectedQuantity = parseInt(this.value);
        const giftName = reservationForm.querySelector('.register').getAttribute('data-gift-name');
        const qrCodePrefix = "qr-" + giftName.toLowerCase().replace(/\s/g, "-"); // Dynamically determine the QR code prefix based on the gift name
        const qrCodeUrl = `images/${qrCodePrefix}${selectedQuantity}.jpg`;

                const qrCodeImage = document.getElementById(`qrCodeImage${index}`);
                const qrCodeLink = document.getElementById(`urllink${index}`);
    
                // console.log("eerste image", qrCodeImage);
                // console.log("eerste link", qrCodeLink);
    
                if (qrCodeImage && qrCodeLink) {
                    qrCodeImage.src = qrCodeUrl;
                    qrCodeLink.href = itemsData[giftName][selectedQuantity]; // Update the href attribute of the link
                    // console.log("QR image href value:", qrCodeImage.src);
                    // console.log("QR code link href value:",  qrCodeLink.href);               
                 } else {
                    console.error("QR code image or link not found.");
                }
            });
        } else {
            console.error(`ReservationForm not found for giftName ${targetGiftName}`);
        }
    }
    });
})

const forwardButtons = document.querySelectorAll('.forwardButton');
      forwardButtons.forEach(forwardButton => {
        //  forwardButton.addEventListener('click', validate);
    });
});


function fetchQuantityAvailable(giftName) {
    return fetch(`https://jjjose.nl/api/quantityavailable.php?gift=${giftName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if ('error' in data) {
                throw new Error(`Error fetching quantity available: ${data.error}`);
            }
            return data;
        });
}

function sendDataToServer(username, giftName, quantityAvailableElement, currentForm, quantityAvailable) {
    // console.log('Sending data to server:', { username, giftName });
    const selectedQuantityElement = currentForm.querySelector(`#quantitySelect`);
    const selectedQuantity = selectedQuantityElement ? selectedQuantityElement.value : null;
    // console.log('Selected quantity:', selectedQuantity);


    fetch('https://jjjose.nl/api/store.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            gift: giftName,
            quantityReserved: selectedQuantity, 
            quantityAvailable: quantityAvailable 
        }),
    })
    .then(response => {
        // console.log('Server Response Status:', response.status);
        // console.log('Server Response Headers:', response.headers);
        return response.json();
    })
    .then(data => {
        // console.log('Data sent successfully:', data);
        // console.log('Sending data to server:', { username, giftName, quantityReserved: selectedQuantity });
        updateItemQuantity(quantityAvailableElement, giftName, currentForm);
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
}


function updateItemQuantity(quantityAvailableElement, giftName, currentForm) {
    // console.log('Updating item quantity for gift:', giftName);
    fetch(`https://jjjose.nl/api/quantityavailable.php?gift=${giftName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        //  console.log('Data received:', data);
        if ('error' in data) {
            // console.error('Error fetching quantity available:', data.error);
            return;
        }

        const quantityAvailable = data.quantityAvailable !== undefined ? data.quantityAvailable : 'onbekend';
        quantityAvailableElement.textContent = `Nog ${quantityAvailable} items beschikbaar`;

        const cardContent = quantityAvailableElement.closest('.card__content');
        const metaQuantityElement = cardContent.querySelector('.meta__quantity');
        if (metaQuantityElement) {
            metaQuantityElement.innerHTML = `Nog <span class="pink">${quantityAvailable}</span> items`;
        }

        // Add disabled class if quantityAvailable is 0 or less
        const itemQuantityAvailable = parseInt(data.quantityAvailable);
        if (itemQuantityAvailable <= 0) {
            currentForm.classList.add('disabled');

            const card = currentForm.closest('.card');
            if (card) {
                card.classList.add('disabled');

                card.addEventListener('click', function(event) {
                    if (card.classList.contains('disabled')) {
                        event.preventDefault();
                    }
                });
            }
            const cardContent = currentForm.closest('.card').querySelector('.card__content');
            if (cardContent) {
                cardContent.classList.add('disabled');
            }

            const commonAncestor = currentForm.closest('.card');
            const gridItem = commonAncestor.querySelector('.grid__item');
            if (gridItem) {
                gridItem.classList.add('disabled');
            }
        }

        // Populate the select dropdown with available quantities
        const quantitySelect = currentForm.querySelector('select');
        // console.log(quantitySelect);
        quantitySelect.innerHTML = ''; // Clear existing options

        for (let i = 1; i <= quantityAvailable; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            quantitySelect.appendChild(option);
        }

})
    .catch(error => {
        // console.error('Error fetching quantity available:', error);
    });
}

  
//fullscreen
document.addEventListener('DOMContentLoaded', function () { 
    // Scroll to the top of the page
     window.scrollTo(0, 0);
    const fullscreenButtons = document.querySelectorAll('.action--buy');

    fullscreenButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            const gridItem = event.currentTarget.closest('.grid__item');
            if (gridItem) {
                gridItem.classList.toggle('fullscreen');

                if (gridItem.classList.contains('fullscreen')) {
                    enterFullscreen(gridItem);
                } else {
                    exitFullscreen(gridItem);
                }
            }
        });
    });

    setup();
});



// backbutton
window.addEventListener('popstate', function(event) {
	window.location.href = "https://jjjose.nl";
  });

 // Filter buttons
function toggleFilterClicked(button) {
	var filterButtons = document.querySelectorAll('.filter .btn.btn-neon.btn-slow');
  	filterButtons.forEach(function (btn) {
	  btn.classList.remove('clicked');
	});
  	button.classList.toggle('clicked');
  }
  
  // Sort buttons
  function toggleSortClicked(button) {
	var sortButtons = document.querySelectorAll('.sort-by-button-group .button.btn.btn-neon.btn-slow');
  	sortButtons.forEach(function (btn) {
	  btn.classList.remove('clicked');
	});
  	button.classList.toggle('clicked');
  }
  
  

;(function(window) {

	'use strict';

	var support = { animations : Modernizr.cssanimations },
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		onEndAnimation = function( el, callback ) {
			var onEndCallbackFn = function( ev ) {
				if( support.animations ) {
					if( ev.target != this ) return;
					this.removeEventListener( animEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(); }
			};
			if( support.animations ) {
				el.addEventListener( animEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn();
			}
		};

	// from http://www.sberry.me/articles/javascript-event-throttling-debouncing
	function throttle(fn, delay) {
		var allowSample = true;

		return function(e) {
			if (allowSample) {
				allowSample = false;
				setTimeout(function() { allowSample = true; }, delay);
				fn(e);
			}
		};
	}

	// sliders - flickity
	var sliders = [].slice.call(document.querySelectorAll('.slider')),
		flkties = [],
		grid = document.querySelector('.grid'),
		iso,
		filterCtrls = [].slice.call(document.querySelectorAll('.filter > button'))

	function init() {
		imagesLoaded(grid, function() {
			initFlickity();
			initIsotope();
			initEvents();
			classie.remove(grid, 'grid--loading');
		});
	}

	function initFlickity() {
		sliders.forEach(function(slider){
			var flkty = new Flickity(slider, {
				prevNextButtons: false,
				wrapAround: true,
				cellAlign: 'left',
				contain: true,
				resize: false
			});
			flkties.push(flkty);
		});
	}

	function initIsotope() {
		iso = new Isotope( grid, {
			isResizeBound: false,
			itemSelector: '.grid__item',
			percentPosition: true,
			masonry: {
				columnWidth: '.grid__sizer'
			},
			transitionDuration: '0.6s'
		});
	}

	function initEvents() {
		filterCtrls.forEach(function(filterCtrl) {
			filterCtrl.addEventListener('click', function() {
				classie.remove(filterCtrl.parentNode.querySelector('.filter__item--selected'), 'filter__item--selected');
				classie.add(filterCtrl, 'filter__item--selected');
				iso.arrange({
					filter: filterCtrl.getAttribute('data-filter')
				});
				recalcFlickities();
				iso.layout();
			});
		});

		// window resize / recalculate sizes for both flickity and isotope/masonry layouts
		window.addEventListener('resize', throttle(function(ev) {
			recalcFlickities()
			iso.layout();
		}, 50));
	}
	

	function recalcFlickities() {
		for(var i = 0, len = flkties.length; i < len; ++i) {
			flkties[i].resize();
		}
	}

	init();

})(window);
