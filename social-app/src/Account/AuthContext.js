import React,{useContext,useState,useEffect} from 'react'
import { auth } from './firebase'
import firebase from 'firebase/app'
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser,setCurrentUser] = useState()
    const [loadingChildren, setLoadingChildren] = useState(true)
    const [loading,setLoading] = useState(true)
    const [posts,setPosts] = useState([])
    const [image,setImage] = useState("")
    const [imageForUpload,setImageForUpload] = useState()
    const [userData,setUserData] = useState([])
    const [lastPost,setLastPost] = useState(0)
    const [disabledPosts,setDisabledPosts] = useState(0)
    const [loadingPosts,setLoadingPosts] = useState(false)
    const [foreignUser, setForeignUser] = useState()

    const deepai = require('deepai'); 
    deepai.setApiKey('d1cbe1ff-200e-447f-8c7f-8d366377582e');

    function getFullDateValue(dateValue) {
        if(dateValue < 10){
            return '0'+dateValue
        }else{
            return dateValue
        }
    }
    function getDate(){
        var today= new Date()
        return {
            time:today.getHours()+":"+getFullDateValue(today.getMinutes()),
            date:getFullDateValue(today.getDate())+'-'+(getFullDateValue(today.getMonth()+1))+'-'+today.getFullYear()
        }
    }
    
    function getUserData(userId) {
        if(currentUser){
                firebase.database().ref(`users/${userId}`).once("value").then(function(snapshot) { 
                    setUserData(snapshot.exportVal())
            })
        }
       
    } 
   
    async function signup(name,email, password){
 
           return( auth.createUserWithEmailAndPassword(email,password).then(function(result) {
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('users/' + userId).set({
                username: name,
                email: email,
                userImage: "images/avatar.png",
                userBgImg:"images/bg.jpg"
              });
        })
           )
     }
     function saveNewPost(postId,comment="",imgUrl="",postType) {
      
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
    
        var username = snapshot.val().username;
        
        firebase.database().ref('Posts/'+postId).set({
            postId:postId,
            comment: comment,
            postImage:imgUrl,
            userId:userId,
            user:username,
            userImage:userData.userImage,
            comments:"",
            numComments:0,
            likes:0,
            likedBy:"",
            date:getDate()
            });
        }).then(function () {
            if(postType==="all"){
                fetchFirstAllUserPosts()
            }else{
                fetchUserPosts()
            
            }
          
        });
        setImage('') 
        firebase.database().ref('/users/' + currentUser.uid+"/posts/"+postId).set(comment)
   
    }
     function uploadImage(type,img,postId,comment) {
        setLoading(true)
        if(!img){
            setLoading(false)
            return
        }
        let storageRef =  firebase.storage().ref(`${type}/${currentUser.uid}/${img.name}`) 

        let task = storageRef.put(img);

        task.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        // eslint-disable-next-line default-case
        switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
        }, function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        // eslint-disable-next-line default-case
        switch (error.code) {
        case 'storage/unauthorized':
        // User doesn't have permission to access the object
      
        break;

        case 'storage/canceled':
         
        // User canceled the upload
        break;

        case 'storage/unknown':
          
        // Unknown error occurred, inspect error.serverResponse
        break;
        }
        }, function() {
        // Upload completed successfully, now we can get the download URL
        setImageForUpload("")
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
         
            if(type==="postImage"){
             
                saveNewPost(postId,comment,downloadURL)
            }else{
               
                firebase.database().ref(`users/${currentUser.uid}/${type}`).set(downloadURL).then(function () {
                     getUserData(currentUser.uid)
                     firebase.database().ref('Posts').orderByChild('userId').equalTo(currentUser.uid).once("value").then(function(snapshot) {
                         if(!snapshot.exists()){
                             setLoading(false)
                             return
                         }
                         snapshot.forEach(function(data) {
                           
                            firebase.database().ref(`/Posts/${data.key}/${type}`).set(downloadURL)
                            fetchUserPosts()
                            setLoading(false)
                         })
                     })
                })
              
            }
           
        });
        });
     }
  
    async function checkImageForNudes(pickerId) {
        var result = await deepai.callStandardApi("content-moderation", {
            image: document.getElementById(pickerId)
        });
       
         if(result.output.nsfw_score>0.049){
             return false
         }else{
             return true
         }
     }
    async function prepareImageForUpload(e,type,pickerId){
       setLoading(true)
        var imageFile = e.target.files[0];
        if(!await checkImageForNudes(pickerId)){
            setLoading(false)
            alert(`
            Your image contains nudity!
            You can't upload that picture!
            `)
            return
        }
        setImageForUpload(imageFile)
    
        if(type==='tempImage'){
            setImage(URL.createObjectURL(imageFile))
            setLoading(false)
            return
        }else{
            uploadImage(type,imageFile)
        }
       
    }
    function fetchFirstAllUserPosts() {
       
        var array=[]
        var counter = 0
       
       firebase.database().ref(`Posts`).orderByKey().limitToLast(3).once("value",function (snapshot) {
            
            snapshot.forEach(function(data) {
               
                firebase.database().ref(`/Posts/${data.key}`).once('value').then((snapshot) => {
                
                    counter++
                    if(counter<2){
                        setLastPost(data.key)
                    }
                        array=[snapshot.exportVal(),...array]
                        setPosts(array)     
                })
               
            })
         
            })
            setLoading(false)
            setDisabledPosts(false)
         
    }

    function fetchAllUserPosts() {
        setLoadingPosts(true)
        var arrayPosts=posts
        var counter = 0
        firebase.database().ref(`Posts`).orderByKey().endAt(lastPost).limitToLast(6).once("value",function (snapshot) {
            if(!snapshot.exists()){
                setDisabledPosts(true)
            }
            snapshot.forEach(function(data) {
               
                firebase.database().ref(`/Posts/${data.key}`).once('value').then((snapshot) => {
                    if(data.key!==lastPost){
                    counter++;
                    if(counter < 2){
                        setLastPost(data.key)
                    }
                      
                    
                    arrayPosts=[...arrayPosts,snapshot.exportVal()]
                }
                   
                }).then(function () {  
                        setPosts(arrayPosts)
                        setLoadingPosts(false)
                      
                        if(counter<5){
                            setDisabledPosts(true)
                        }else{
                            setDisabledPosts(false)
                        }
                    
                })
            })
        })

    }
    
    async function fetchUserPosts(userId) {
        
        let p = new Promise((resolve,reject)=>{

        
            firebase.database().ref('Posts').orderByChild('userId').equalTo(firebase.auth().currentUser.uid).on("value", function(snapshot) {
            var array=[]
    
            if(!snapshot.exists()){
                setLoading(false)
                return
            }
            snapshot.forEach(function(data) {
                firebase.database().ref('/Posts/' + data.key).once('value').then((snapshot) => {
                    array.push(snapshot.exportVal())
            
                }).then(function () {
                    resolve(array)
                  
                });
            })
        })
        })
        p.then((result) =>{
            setPosts(result.reverse())
            setLoading(false)
        })
        
    }
    
    function writeNewPost(postId,comment,postType="") {
        
        setLoading(true)
        if(imageForUpload){
            uploadImage("postImage",imageForUpload,postId,comment)
            setImageForUpload('')
        }else{
            saveNewPost(postId,comment,"",postType)
        }
   
    
    }

    function getUsername() {
    firebase.database().ref('users').orderByChild('email').equalTo(currentUser.email).on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            return firebase.database().ref('users/'+data.key+'/username')
        });
    });
    }
    function login(email,password) {
    return auth.signInWithEmailAndPassword(email,password)
    }
    
    function logout() {
        setPosts([])
        setUserData([])
        auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    //UPDATES
    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }
    
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }
    function updateUsername(username) {
        setLoading(true)
        firebase.database().ref(`users/${currentUser.uid}/user`).set(username).then(function () {
            getUserData()
            firebase.database().ref('Posts').orderByChild('userId').equalTo(currentUser.uid).once("value").then(function(snapshot) {
                if(!snapshot.exists()){
                    setLoading(false)
                    return
                }
                snapshot.forEach(function(data) {
                  
                   firebase.database().ref(`/Posts/${data.key}/user`).set(username)
                   fetchUserPosts()
                   setLoading(false)
                })
            })
    })
}

     useEffect(() => {
        
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoadingChildren(false)
        })

        return unsubscribe
     }, [])
    const value ={
        currentUser,
        signup,
        login,
        logout,
        getUserData,
        userData,
        foreignUser,
        loading,
        loadingPosts,
        disabledPosts,
        resetPassword,
        updatePassword,
        updateEmail,
        updateUsername,
        writeNewPost,
        getUsername,
        fetchUserPosts,
        fetchAllUserPosts,
        fetchFirstAllUserPosts,
        uploadImage,
        prepareImageForUpload,
        image,
        posts,
        setPosts
    }
    return (
        <AuthContext.Provider value={value}>
            {!loadingChildren && children}
        </AuthContext.Provider>
    )
}


