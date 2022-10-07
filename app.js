window.addEventListener("load", ()=>{

    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition (position => 
        {long = position.coords.longitude;
         lat = position.coords.latitude
         console.log(long)
         console.log(lat)

         const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b923334b2cmsh7a782c09835de9bp1b3dbajsn54b29cd9124d',
                'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
            }
        };
        
         fetch(`https://dark-sky.p.rapidapi.com/${lat},${long}?units=auto&lang=en`, options)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data)
                const {temperature, summary, icon} = data.currently
                const timeZone = data.timezone
                //Api info being set on the DOM
                temperatureDegree.textContent = temperature
                temperatureDescription.textContent = summary
                locationTimezone.textContent = timeZone

                setIcons(icon, document.querySelector(".icon"))

            })

        });

    }
    else{
         h1.textcontent = "nu work D:"
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }


});