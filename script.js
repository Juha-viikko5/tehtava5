
const haeNappi = document.getElementById("haeNappi");
const rotuValinta = document.getElementById("rotuValinta");
const tilaTeksti = document.getElementById("tilaTeksti");
const tulosAlue = document.getElementById("tulosAlue");


haeNappi.addEventListener("click", () => {
    
    tilaTeksti.innerText = "Haetaan koirakuvia...";
    tilaTeksti.classList.remove("virhe"); 
    tulosAlue.innerHTML = ""; 
    
    const rotu = rotuValinta.value;
    let apiOsoite = "";
    
    if (rotu === "random") {
        apiOsoite = "https://dog.ceo/api/breeds/image/random/3"; 
    } else {
        apiOsoite = `https://dog.ceo/api/breed/${rotu}/images/random/3`; 
    }

    fetch(apiOsoite)
        .then(response => {
            if (!response.ok) {
                throw new Error("Verkkovirhe: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Saatu data Dog API:sta:", data);
            
            tilaTeksti.innerText = "Kuvat haettu onnistuneesti!";
            
            
            data.message.forEach(kuvaUrl => {
                const kortti = document.createElement("div");
                kortti.classList.add("kortti");
                
                kortti.innerHTML = `
                    <img src="${kuvaUrl}" alt="Satunnainen koira">
                `;
                
                tulosAlue.appendChild(kortti);
            });
        })
        .catch(virhe => {
            console.error("Taustavirhe kehittäjälle:", virhe);
            tilaTeksti.innerText = "Hups! Verkkoyhteys ei toimi tai haku epäonnistui. Kokeile myöhemmin uudelleen.";
            tilaTeksti.classList.add("virhe");
        });
});