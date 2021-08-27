const input = document.querySelector('.input');
const cards = document.querySelector('.cards');

input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        let value = input.value.split(' ').join('')
        async function get() {
            let prom = await fetch(`https://api.github.com/users/${value}`);
            prom.json().then(data => {
                main(data)
            }).catch(err => {
                alert('Data For This Username Is Not Available');
                input.value = '';
            })
        }
        get();

        function main(data) {
            console.log(data);
            if (data.avatar_url != null && data.name != null && data.bio != null && data.followers != null && data.following != null && data.public_repos != null) {
                cards.innerHTML = `
            <div class="card">
            <div class="avatar">
                <img src="${data.avatar_url}" alt="">
            </div>
            <div class="name">
                <h1>
                    ${data.name}
                </h1>
            </div>
            <div class="bio">
                <p>${data.bio}</p>
                <p><a href="https://github.com/${data.login}/" target="_blank" >Open In Github</a></p>
            </div>
            <div class="tabs">
                <div class="tab" title="Followers">
                    <div>
                        <i class="fas fa-user-plus"></i>&nbsp;
                        <span class="followers">${data.followers}</span>
                    </div>
                </div>
                <div class="tab" title="Following">
                    <i class="fas fa-user"></i>&nbsp;
                    <span class="following">${data.following}</span>

                </div>
                <div class="tab" title="Repository">
                    <i class="fas fa-tasks"></i>&nbsp;
                    <span class="work">${data.public_repos}</span>
                </div>
            </div>
        </div>
            `;
                input.value = '';
            }

            else {
                alert('Data For This Username Is Not Available');
                input.value = '';
            }
        }
    }
})
