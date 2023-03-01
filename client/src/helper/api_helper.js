const findToken = () => {
    const token = localStorage.getItem("jwt")
    if(token){
        return token;
    } else {
        return ""
    }
}

const token = findToken()


export async function get(url, config = {}) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (response.ok) {
                            resolve(data)
                        } else {
                            reject(data)
                        }
                    })
                    .catch((err) => reject(err))
            })
            .catch(error => reject(error))
    })
}

export async function post(url, data, config = {}) {

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (response.ok) {
                            resolve(data)
                        } else {
                            reject(data)
                        }
                    })
                    .catch((err) => reject(err))
            })
            .catch(error => reject(error))
    })
}
