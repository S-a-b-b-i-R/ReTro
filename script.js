console.log("connected!");
const loadPosts = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
    const data = await res.json();
    const posts = data.posts;
    const postContainer = document.getElementById("posts");
    posts.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.innerHTML = `
        <div class="bg-cardBg p-10 rounded-xl flex flex-col lg:flex-row justify-start items-start gap-6 hover:cursor-pointer post">
                    <div class="indicator">
                        <span class="indicator-item badge ${
                            post.isActive ? "badge-success" : "badge-error"
                        }"></span>
                        <div class="grid w-20 h-20 bg-base-300 place-items-center">
                            <div class="avatar">
                                <div class="w-full rounded">
                                    <img src="${post.image}" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-5 w-full">
                        <div class="flex gap-5 inter text-sm font-medium leading-4 text-cardTop">
                            <p class="">#Music</p>
                            <p>Author : ${post.author.name}</p>
                        </div>
                        <h1 class="mulish text-xl font-bold leading-6">${
                            post.title
                        }</h1>
                        <p class="inter text-base font-normal leading-6 text-normalText">${
                            post.description
                        }</p>
                        <hr class="border-2 border-dashed">
                        <div class="flex justify-between items-center text-lg">
                            <div class="flex gap-5 text-normalText">
                                <div>
                                    <i class="fa-regular fa-message" style="color: #000000;"></i>
                                    <span>${post.comment_count}</span>
                                </div>
                                <div>
                                    <i class="fa-regular fa-eye" style="color: #000000;"></i>
                                    <span>${post.view_count}</span>
                                </div>
                                <div>
                                    <i class="fa-regular fa-clock" style="color: #000000;"></i>
                                    <span>${post.posted_time} min</span>
                                </div>
                            </div>
                            <div>
                                <i class="fa-solid fa-envelope" style="color: #30c054;"></i>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        postContainer.appendChild(postDiv);
    });
    const cards = document.querySelectorAll(".post");
    for (let card of cards) {
        card.addEventListener("click", function () {
            const readItems = document.querySelector("#read");
            const div = document.createElement("div");
            div.className =
                "flex justify-between items-center bg-white p-4 rounded-xl mb-3";
            const li = document.createElement("li");
            li.className = "mulish text-lg font-bold w-2/3";
            const name = card.childNodes[3].childNodes[3].innerText;
            li.appendChild(document.createTextNode(name));
            li.style.listStyle = "none";
            div.appendChild(li);
            const i = document.createElement("i");
            i.className = "fa-regular fa-eye text-sm";
            const span = document.createElement("span");
            span.className = "text-sm mulish";
            span.innerText =
                card.childNodes[3].childNodes[9].childNodes[1].childNodes[3].childNodes[3].innerText;
            i.appendChild(span);
            div.appendChild(i);
            readItems.appendChild(div);
            const totalRead = document.querySelector("#total-read");
            totalRead.innerText = readItems.childElementCount;
        });
    }
};

const loadLatestPost = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
    );
    const data = await res.json();
    const posts = data;

    const postContainer = document.querySelector(".latest");
    posts.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.innerHTML = `<div class="p-4 rounded-2xl border-2 h-full">
        <div class="card card-compact bg-base-100">
            <figure class="rounded-xl"><img
                    src="${post.cover_image}" alt="Shoes" />
            </figure>
            <div class="card-body">
                <div class="flex gap-4 items-center mulish text-normalText">
                    <i class="fa-regular fa-calendar-days"></i>
                    <span class=" text-base font-normal">12th Oct 2021</span>
                </div>
                <h2 class="mulish text-lg font-extrabold leading-7">${
                    post.title
                }</h2>
                <p class="mulish text-base font-normal text-normalText leading-6">${
                    post.description
                }</p>
                <div class="card-actions justify-start items-center gap-4">
                    <div class="avatar">
                        <div class="w-14 rounded-full">
                            <img src="${post.profile_image}" />
                        </div>
                    </div>
                    <div>
                        <h1 class="mulish text-base font-bold">${
                            post.author.name
                        }</h1>
                        <p class="mulish text-sm font-normal text-normalText">${
                            post.author.designation
                                ? post.author.designation
                                : "Unknown"
                        }</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        postContainer.appendChild(postDiv);
    });
};

loadPosts();
loadLatestPost();
