const searchMobil = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    if (searchText == '') {
        // please writte something to display
    }
    else {
        // Load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        //    console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(value => displaySearchResult(value.data.slice(0, 20)))
    }
}
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

const displaySearchResult = data => {
    
    const searchResult = document.getElementById('search-result');
    // toogle spinner
    toggleSpinner('block')
    searchResult.textContent = '';
    data.forEach(data => {
        console.log(data);
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100 col-12 ">
            <img src="${data.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${data.phone_name}</h5>
            <p class="card-text">${data.slug}</p>
            <button onclick="loadMobileDetail('${data.slug}')"class="btn btn-info bg-opacity-10 ">Deatils</button>
          </div>
        </div>
        `;
        searchResult.appendChild(div)
    })
    toggleSpinner('none')
}
const loadMobileDetail = phone => {
    document.getElementById('details').style.display = "block"
    const url = `https://openapi.programming-hero.com/api/phone/${phone}`
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayMobilDetail(data.data))
}

const displayMobilDetail = mobile => {
    console.log(mobile);
 
    document.getElementById("img").src = mobile.image;
    const others = mobile.others;
    inputValue("brand", mobile.brand);
    inputValue("name", mobile.name);
    inputValue("display", mobile.mainFeatures.displaySize)
    inputValue("chipset", mobile.mainFeatures.chipSet)
    inputValue("memory", mobile.mainFeatures.memory)
    inputValue("sensors", mobile.mainFeatures.sensors)
    inputValue("release", mobile.releaseDate)
    inputValue("sensors", Object.entries(others).map(([key, value]) => (key, value)))
    
    inputValue("nfc", mobile.others.NFC)
    inputValue("bt", mobile.others.Bluetooth)
    inputValue("radio", mobile.others.Radio)
    inputValue("usb", mobile.others.USB)
    inputValue("gps", mobile.others.GPS)
    inputValue("waln", mobile.others.WLAN)

}

const inputValue = (id, para) => {
    document.getElementById(id).innerText = para;

}