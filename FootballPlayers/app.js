const loadAllData = (playerName) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`)
       .then(response => response.json())
       .then(data => {
            displayPlayerData(data.player);
       })
       
}
let group = [];
const addingToGroup = (strPlayer) => {
    
    if (!group.includes(strPlayer)) {
        group.push(strPlayer);
    }else{
        alert(`${strPlayer} is already in the group!`);
    }
}
const updateButton = (button) => {
    button.style.backgroundColor = 'red';  
    button.innerHTML = 'Added';    
};
const displayPlayerData = (playerInfo) => {

    const playerContainer = document.querySelector('.playerContainer');
    playerContainer.classList.add('playerContainerClass');
    playerContainer.innerHTML = '';
    playerInfo.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('playerDetails');
        playerDiv.innerHTML = `
            <h2 class="playerDth2">${player.strPlayer}</h2>
            <img src="${player.strThumb}" alt="${player.strPlayer}">
            <div class="playersP">
                <li>${player.strNationality}</li>
                <li>${player.strGender}</li>
                <li>${player.strSport}</li>
                <li>${player.strPosition}</li>
            <div class="icons">
                <p>
                <a href="${player.strFacebook}" target="_blank">
                    <i class="fa-brands fa-facebook"></i>
                </a>
                </p>
                <p>
                <a href="${player.strTwitter}" target="_blank">
                    <i class="fa-brands fa-twitter"></i>
                </a>
                </p>
                <p><a href="${player.strInstagram}" target="_blank">
                <i class="fa-brands fa-instagram"></i></a>
                </p>
            </div>
            </div>
            <div class="buttons">
                <button class="addGroup" onclick="addingToGroup('${player.strPlayer.replace(/'/g, "\\'")}'); updateButton(this)">Add to Group</button>
                <button onclick="addTotheCard(${player.idPlayer})">Details</button>       
            </div>
            `;
            
        playerContainer.appendChild(playerDiv);
    });
}

// Assuming playerInfo is accessible globally
const addTotheCard = (idPlayer) => { 
    fetch(`https://www.thesportsdb.com//api/v1/json/3/lookupplayer.php?id=${idPlayer}`)
    .then(response => response.json())
    .then(data => {
         detailsCard(data.players);
    })
    
}


const detailsCard = (players) => {
    console.log(players[0].idPlayer);
    players.forEach(player => {
        console.log(player.idPlayer)
        const playerCard = document.querySelector('.card-datas');
        playerCard.innerHTML = '';
        let married = '';
        if(players.intLoved == 0){
            married = 'Unmarried';
        }else{
            married = 'Married';
        }
        let plStatus = '';
            if(player.strStatus == null){
                plStatus = 'Inactive';
            }else{
                plStatus = player.strStatus;
            }
        playerCard.classList.add('playerCardClass');
        playerCard.innerHTML = `
            <h2 class="playerDth2">${player.strPlayer} <span class="status">(${plStatus})</span></h2>
            <img src="${player.strRender}" alt="${player.strPlayer}">
            <p class="des">Description: ${player.strDescriptionEN}</p>
            <div class="playersP">
                <li>Gender: ${player.strGender}</li>
                <li>Nationality: ${player.strNationality}</li>
                <li>Date of Birth: ${player.dateBorn}</li>
                <li>Height: ${player.strHeight}</li>
                <li>Weight: ${player.strWeight}</li>
                <li>Marital Status: ${married}</li>
                <li>Birth Locatioin: ${player.strBirthLocation}</li>
                <li>Sports: ${player.strSport}</li>
                <li>Position: ${player.strPosition}</li>
                <li>Team: ${player.strTeam}</li>
                <li>Sign Date: ${player.dateSigned}</li>
            </div>
        `
        playerCard.appendChild(playerDiv); 
    });

    

}

const takingInput = () => {
    const playerName = document.getElementById('player').value;
    loadAllData(playerName);
 
}
loadAllData('ee');
addTotheCard(34146034);