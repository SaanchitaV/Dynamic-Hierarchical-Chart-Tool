function ProfilePic (){

const imgDiv = document.querySelector('.profile-pic');
const img = document.querySelector('.photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('.upldbtn');

imgDiv.addEventListener('mouseenter', function(){
    uploadBtn.style.display = "block";
})

imgDiv.addEventListener('mouseleave', function(){
    uploadBtn.style.display = "none";
})


file.addEventListener('change', function(){
    const chosenFile = this.files[0];

    if(chosenFile){
        const reader = new FileReader();

        reader.addEventListener('load', function(){
            img.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(chosenFile);
    }
})

return(
    <ProfilePic></ProfilePic>
)

}

export default ProfilePic;