

let data;
async function fetchData() {
    const resp = await fetch("/portfolio two v2/javascript/main.json");
    data = await resp.json();
}






let head = document.querySelector(".head");

function clickBar() {
    let me = document.querySelector(".sidebar-button");

    function closebar() {
        head.style.transform = "translateX(0)";
        document.body.style.filter = "brightness(0.8)";
        me.classList.add("active");
    }
    function openbar() {
        me.classList.remove("active")
        document.body.style.filter = "unset";
        head.style.transform = "translateX(-200px)";
    }


    me.addEventListener("click", function () {
        if (me.classList.contains("active")) {
            openbar();
        }
        else {
            head.style.position = "fixed";
            closebar();
        }
    });

    window.addEventListener("scroll", () => {
        if (me.classList.contains("active")) openbar();
    })

}
clickBar();



function topRow() {
    let rowt = document.querySelector(".top-row");
    let spanH = document.querySelector(".top-row span");
    rowt.style.display = "none";
    window.addEventListener("scroll", () => {
        window.scrollY > 500 ? rowt.style.display = "flex" : rowt.style.display = "none";
        spanH.style.height = `${(window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100}%`;

    });

}
if (window.innerWidth < 1000) {
    topRow();
}





function writeDelete() {
    fetchData().then(() => {
        let listJobs = data.sections[0].home.skillsList;
        let txtJ = document.querySelector(".jobs");
        let i = 0;
        let index = 0;
        write();
        function write() {
            if (index > listJobs.length - 1) {
                index = 0;
            }
            let one = setInterval(() => {
                txtJ.innerHTML = listJobs[index].slice(0, i);
                i++;
                if (i > listJobs[index].length) {
                    i = 0;
                    clearInterval(one);
                    setTimeout(() => deleting(), 1500);
                }
            }, 50);
        }

        function deleting() {
            let two = setInterval(() => {
                txtJ.innerHTML = listJobs[index].slice(0, txtJ.textContent.length - 1);
                if (txtJ.textContent.length == 0) {
                    index++;
                    clearInterval(two);
                    setTimeout(() => {
                        write();
                    }, 1500);
                }
            }, 100);
        }
    })
}

writeDelete();

function fixBar() {
    document.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            head.classList.add("head-scrolled");
        }
        else if (window.scrollY < 200) {
            head.classList.remove("head-scrolled");
        }
    });
}
fixBar();



// function skillProgress() {
function skilP() {
    fetchData().then(() => {
        let skills = data.sections[4].skills;
        let skillName = document.querySelectorAll(".skills .skills-contant h3");
        let dataSkill = document.querySelectorAll(".skill-progress");
        for (let i = 0; i < skillName.length; i++) {
            skillName[i].textContent = skills[`skill-${i + 1}`][0];
            dataSkill[i].setAttribute("data-skill", skills[`skill-${i + 1}`][1])
        }

    })
    let mis = document.querySelectorAll(".skill-progress");
    let cie = document.querySelectorAll(".circule");
    let skilldone = true;
    function skillProgress(mi, ci) {
        let m = 0;
        const targetSkill = parseInt(mi.getAttribute("data-skill"), 10);

        function updateProgress() {
            m++;
            ci.style.background = `conic-gradient(#1f8ff1a6 ${m}%, #e0e0e0 ${m}%, #e0e0e0 100%)`;
            mi.innerHTML = `${m}`;
            if (m < targetSkill) {
                requestAnimationFrame(updateProgress);
            }
        }

        requestAnimationFrame(updateProgress);
    }

    window.addEventListener("scroll", () => {
        if (window.scrollY > 3000 && skilldone) {
            for (let i = 0; i < cie.length; i++) {
                skillProgress(mis[i], cie[i]);
            }
            skilldone = false;
        }
    });

}

skilP();



function listActivation() {
    const sections = document.querySelectorAll('body  .allp > div');
    const lists = document.querySelectorAll(".list ul li");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    lists.forEach(section => section.classList.remove('active-list'));
                    lists.forEach((e) => {
                        if (entry.target.className == e.textContent.trim()) e.classList.add('active-list');
                    })
                }
            });
        },
        {
            threshold: 0.5 // Adjust this threshold as needed
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });
}
if (window.innerWidth >= 1000) {
    listActivation();
}


// for (let i = 0; i < allsection.length; i++) {
//     console.log(allsection[i].getBoundingClientRect().y);
// }










function jsonText() {

    fetchData().then(() => {
        let allData = data.sections;
        function home() {
            let home = allData[0].home;
            let logoName = document.querySelectorAll(".logo-name");
            logoName.forEach((e) => {
                let spansep = document.createElement("span");
                spansep.textContent = home.logoName[0];
                e.innerHTML = home.logoName.slice(1);
                e.prepend(spansep);
            })

            let Fname = document.querySelector(".landing-text h2");
            Fname.innerHTML = home.firstName + "<br>" + home.lastName;

            let skills

        }
        home();


        function about() {
            let aboutp = document.querySelector(".about-content p");
            aboutp.innerHTML = allData[1].about.text;
        }
        about();

        function services() {
            let services = allData[2].services;
            let allBox = document.querySelectorAll(".box-text");
            for (let i = 0; i < allBox.length; i++) {
                allBox[i].firstElementChild.textContent = services[`services-title-text${i + 1}`][0];
                allBox[i].lastElementChild.textContent = services[`services-title-text${i + 1}`][1];
            }
        }
        services();

        function portfolio() {
            let portfolio = allData[3].portfolio;;
            let portfolioLink = document.querySelectorAll(".portfolio .live a");
            let portfolioTitle = document.querySelectorAll(".portfolio  .title");
            for (let i = 0; i < portfolioLink.length; i++) {
                let project = portfolio[`project-${i + 1}`];
                portfolioLink[i].setAttribute("href", project["link"]);
                portfolioTitle[i].textContent = project["name"];

            }
        }
        portfolio();

        function testimonail() {
            let testimonail = allData[5].testimonail;
            let testiInfo = document.querySelectorAll(".testimonail-content > div");
            testiInfo.forEach((e, i) => {
                let content = testimonail[`custumer-${i + 1}`];
                e.querySelector("span").textContent = content["company name"];
                e.querySelector("p").innerHTML = content["text"];
                e.querySelector("h5").textContent = content["custumer name"];
                e.querySelector("h4").textContent = content["job"];
            })

        }
        testimonail();

        function stats() {
            let stats = allData[6].stats;
            let stastInfo = document.querySelectorAll(".stats  span");
            Object.values(stats).forEach((e, i) => stastInfo[i].innerHTML = e + "+");

        }
        stats();

        function contact() {
            let contactInfo = allData[7].contact.information;
            let socialMedia = allData[7].contact["social media"];
            let info = document.querySelectorAll(".contact-info p");
            Object.keys(contactInfo).forEach((e, i) => {
                let text = document.createTextNode(contactInfo[e]);
                info[i].append(text);
            });
            let social = document.querySelectorAll(".social a");
            // console.log(social[0]);
            // social[0].setAttribute("href", 'dofer');
            Object.keys(socialMedia).forEach((e, i) => {
                social[i].setAttribute("href", socialMedia[e]);
                social[i].setAttribute("target", "_blank");
            })
        }
        contact();

    });
}
jsonText();




function enterAnimation() {
    let divAN = document.querySelector(".anm");
    setTimeout(() => {
        document.body.removeChild(divAN);
        document.querySelector(".allp").style.display = "block";
        startAll();
    }, 4500)
}
enterAnimation();

