
let profileImage;


window.onload = function() {
    // Check if the profile image exists in localStorage
    let imageData = JSON.parse(localStorage.getItem('image'));

    if (imageData && imageData.img) {
        // Set the profile image on the homepage
        document.getElementById('profile').src = imageData.img;
    }

    // Load blogs if they exist
    const blogs = JSON.parse(localStorage.getItem("blogInfo")) || [];
    let content = '';

    // Loop through the blogs array and build the HTML
    blogs.forEach((element, index) => {
        content += `<div class="article">
            <div class="date">${element.date}</div>
            <div class="title" style="cursor:pointer" onclick="viewBlogDetail(${index})">${element.Title}</div>
            <div class="subtitle">${element.subtitle}</div>
            <hr></hr>
            <div class="author">
                <img src="${element.img}" alt="Author image">
                <div class="author-info">
                    <strong>${element.name}</strong><br>
                    CTO
                </div>
            </div>
        </div>`;
    });

    // Set the innerHTML of the content div after the loop
    document.getElementById('content').innerHTML = content;
};

// Function to navigate to the detailed blog page
function viewBlogDetail(index) {
    // Get the blogs from localStorage
    const blogs = JSON.parse(localStorage.getItem("blogInfo")) || [];

    // Store the clicked blog's details in localStorage
    localStorage.setItem('selectedBlog', JSON.stringify(blogs[index]));

    // Redirect to the blog detail page
    window.location.href = 'blog_detail.html';
}




function addBlog() {
    console.log("hello");

    let t = document.getElementById('title').value;
    let s = document.getElementById('subtitle').value;
    let b=document.getElementById("main_blog").value;
    console.log(t,b);

    const currentDate = new Date();
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    let imageData = JSON.parse(localStorage.getItem('image')); // Correctly parse the image
    let userProfile = JSON.parse(localStorage.getItem('userProfile')); // Correctly parse the profile

    let k = {
        date: formattedDate,
        Title: t,
        subtitle: s,
        blog:b,
        img: imageData ? imageData.img : '', // Handle case if image is not found
        name: userProfile ? userProfile.username : 'Anonymous' // Handle case if userProfile is not found
    };

    let items = JSON.parse(localStorage.getItem("blogInfo")) || [];

    items.push(k);

    localStorage.setItem("blogInfo", JSON.stringify(items));

    document.getElementById('blogForm').reset();
    location.reload();
}

function saveProfile() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    let imageData = JSON.parse(localStorage.getItem('image')); // Correctly parse the image
    if (imageData && imageData.img) {
        document.getElementById("profile").src = imageData.img;
    }

    localStorage.setItem('userProfile', JSON.stringify({ username, email, phone }));

    alert('Profile updated successfully!');
}
