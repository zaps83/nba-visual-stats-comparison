import axios from 'axios'

// NBA API

let nbaUrl = 'https://api-nba-v1.p.rapidapi.com'

const options = {
    method: 'GET',
    url: nbaUrl,
    headers: {
      'x-rapidapi-key': 'a5be7c2e04msh853a41ebda7b375p1b0c64jsn3d211e991fbf',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

export const fetchTeams = async () => {

    options.url = `${nbaUrl}/teams/league/standard`

    try {
        let data = await axios.request(options)
        data = data.data.api.teams
            .filter((team => team.nbaFranchise == 1 && team.fullName != 'Home Team Stephen A'))
        return data

    } catch (error) {
        console.log('Teams()', error)
    }
}

export const fetchPlayers = async (teamId) => {

    options.url = `${nbaUrl}/players/teamId/${teamId}`
    console.log('options.url', options.url)

    try {
        let data = await axios.request(options)
        data = data.data.api.players
        .filter((player => player.startNba != 0 || player.yearsPro != 0))
        .filter((player => player.leagues.standard && player.leagues.standard.active == 1))
        return data 
    } catch (error) {
        console.log('fetchPlayers()', error)
    }
}


// balldontlie

const bdlUrl = 'https://www.balldontlie.io/api/v1'

export const fetchStats = async (player) => {

    try {
        //get id
        player = player.split('0')

        let firstNameSearch = `${bdlUrl}/players?per_page=100&search=${player[0]}`
        let lastNameSearch = `${bdlUrl}/players?per_page=100&search=${player[1]}`

        let firstNameData = await axios.get(firstNameSearch)
        let lastNameData = await axios.get(lastNameSearch)

        firstNameData = firstNameData.data
        lastNameData = lastNameData.data

        let firstData = firstNameData, lastData = lastNameData, firstName = player[0], lastName = player[1], id = ''
        let arr = firstData.data, arr2 = lastData.data
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (arr[i].id === arr2[j].id && firstName == arr[i].first_name && lastName == arr2[j].last_name) {
                    id = arr[i].id
                }
            }
        }
        if (firstData.meta.next_page == 2 && id == '') {
            let firstNamePage2Search = `${bdlUrl}/players?per_page=100&page=2&search=${firstName}`
            let firstNamePage2 = await axios.get(firstNamePage2Search)
            arr = firstNamePage2.data.data
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr2.length; j++) {
                    if (arr[i].id === arr2[j].id && firstName == arr[i].first_name && lastName == arr2[j].last_name) {
                    id = arr[i].id
                    }
                }
                }
        }
        if (lastData.meta.next_page == 2 && id == '') {
            let lastNamePage2Search = `${bdlUrl}/players?per_page=100&page=2&search=${lastName}`
            let lastNamePage2 = await axios.get(lastNamePage2Search)
            arr2 = lastNamePage2.data.data
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr2.length; j++) {
                    if (arr[i].id === arr2[j].id && firstName == arr[i].first_name && lastName == arr2[j].last_name) {
                    id = arr[i].id
                    }
                }
                }
        }
        console.log('id', id)

        // get yearsPro
        options.url = `${nbaUrl}/players/firstName/${player[0]}/lastName/${player[1]}`

        let careerStartData = await axios.request(options)
        let yearsProNames = careerStartData.data.api.players
        yearsProNames = yearsProNames.filter(obj => obj.firstName == player[0] && obj.lastName == player[1])
        let yearsPro = yearsProNames[0].yearsPro
        console.log('yearPro', yearsPro)

        let year = 2020 - Number(yearsPro), careerStats= {stats: [], seasons: []}
        for (year; year < 2021; year++) {
            let yearlyStats = `${bdlUrl}/season_averages?season=${year}&player_ids[]=${id}`
            let careerData = await axios.get(yearlyStats)
            careerData = careerData.data.data[0]
            if (careerData) {
                careerStats.stats.push(careerData)
                careerStats.seasons.push(year)
                careerStats.stats[careerStats.stats.length - 1].name =  player.join(' ')
            }
            console.log('year', year, 'careerStats', careerStats)
        } 
        careerStats.name = player.join(' ')

        return {
            careerStats,
            seasonsData: {
                seasons: careerStats.seasons,
                id: id,
                name: player.join(' ')
            }
        }
    } catch (error) {
        console.log('fetchStats()', error)
    }
}



export const fetchSeasonStats = async (year, id, name) => {

    let seasonStats = await axios.get(`${bdlUrl}/season_averages?season=${year}&player_ids[]=${id}`)
    seasonStats.data.data[0].name = name
    seasonStats.data.data[0].year = year
    return seasonStats.data.data[0]

}