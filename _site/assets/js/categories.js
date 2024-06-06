const categories = { técnicas: [{ url: `/posts/pivoting/`, date: `10 May 2023`, title: `Pivoting: De la Exploración a la Explotación`},],redes: [{ url: `/posts/pivoting/`, date: `10 May 2023`, title: `Pivoting: De la Exploración a la Explotación`},],git: [{ url: `/posts/git-breach/`, date: `21 Oct 2023`, title: `La importancia de .gitignore`},],ciberseguridad: [{ url: `/posts/john-guide/`, date: `11 Mar 2024`, title: `Conociendo a: John The Ripper`},{ url: `/posts/google-dorks/`, date: `23 Feb 2024`, title: `Google Dorks: Qué son y para qué`},{ url: `/posts/writeup/`, date: `06 Dec 2023`, title: `Cybersecurity Week 2023 - Writeup`},{ url: `/posts/git-breach/`, date: `21 Oct 2023`, title: `La importancia de .gitignore`},],data_exposure: [{ url: `/posts/git-breach/`, date: `21 Oct 2023`, title: `La importancia de .gitignore`},],pumahat: [{ url: `/posts/writeup/`, date: `06 Dec 2023`, title: `Cybersecurity Week 2023 - Writeup`},],ctf: [{ url: `/posts/writeup/`, date: `06 Dec 2023`, title: `Cybersecurity Week 2023 - Writeup`},],google_hacking: [{ url: `/posts/google-dorks/`, date: `23 Feb 2024`, title: `Google Dorks: Qué son y para qué`},],busquedas_avanzadas: [{ url: `/posts/google-dorks/`, date: `23 Feb 2024`, title: `Google Dorks: Qué son y para qué`},],password_cracking: [{ url: `/posts/john-guide/`, date: `11 Mar 2024`, title: `Conociendo a: John The Ripper`},],hash: [{ url: `/posts/john-guide/`, date: `11 Mar 2024`, title: `Conociendo a: John The Ripper`},],writeup: [{ url: `/posts/bricks-h3ist-writeup/`, date: `13 Apr 2024`, title: `Tryhack3M: Brick Heist`},],blockchain: [{ url: `/posts/bricks-h3ist-writeup/`, date: `13 Apr 2024`, title: `Tryhack3M: Brick Heist`},],Wordpress: [{ url: `/posts/bricks-h3ist-writeup/`, date: `13 Apr 2024`, title: `Tryhack3M: Brick Heist`},],Miners: [{ url: `/posts/bricks-h3ist-writeup/`, date: `13 Apr 2024`, title: `Tryhack3M: Brick Heist`},],Threat_hunting: [{ url: `/posts/bricks-h3ist-writeup/`, date: `13 Apr 2024`, title: `Tryhack3M: Brick Heist`},], }

console.log(categories);

window.onload = function () {
  document.querySelectorAll(".article-category").forEach((category) => {
    category.addEventListener("click", function (e) {
      const posts = categories[e.target.innerText.replace(" ","_")];
      console.log(posts);
      let html = ``
      posts.forEach(post=>{
        html += `
        <a class="modal-article" href="${post.url}">
          <h4>${post.title}</h4>
          <small class="modal-article-date">${post.date}</small>
        </a>
        `
      })
      document.querySelector("#category-modal-title").innerText = e.target.innerText;
      document.querySelector("#category-modal-content").innerHTML = html;
      document.querySelector("#category-modal-bg").classList.toggle("open");
      document.querySelector("#category-modal").classList.toggle("open");
    });
  });

  document.querySelector("#category-modal-bg").addEventListener("click", function(){
    document.querySelector("#category-modal-title").innerText = "";
    document.querySelector("#category-modal-content").innerHTML = "";
    document.querySelector("#category-modal-bg").classList.toggle("open");
    document.querySelector("#category-modal").classList.toggle("open");
  })
};