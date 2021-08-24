import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';


const Chats = () => {
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    // console.log(user);


    const handleLogout = async() => {
        await auth.signOut();
        history.push('/');
    }


    const getFile = async(url) => {
        const res = await fetch(url);
        const data = await res.blob();

        return new File([data], "userPhoto.jpeg",{type:'image/jpeg'})
    }

    useEffect(() => {
        if(!user){
            history.push('/');
            return;
        }
        
        axios.get('https://api.chatengine.io/users/me', {
            headers:{
                "project-id":"7bc2a908-b6d6-451c-9313-264f8017e638",
                "user-name":user.email,
                "user-secret":user.uid
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formData = new FormData();
            formData.append('email', user.email);
            formData.append('username',user.email);
            formData.append('secret',user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formData.append('avatar', avatar, avatar.name)

                    axios.post('https://api.chatengine.io/users',formData,
                    {
                        headers: {'private-key':process.env.REACT_APP_CHAT_ENGINE_KEY}
                    })
                    .then(() => {setLoading(false)})
                    .catch((err) => {console.log(err)});

                })
        })

    },[user, history])

    if(!user || loading) return 'Loading.. !!';


    return ( 
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Messenger
                </div>
                <div className="logout-tab" 
                    onClick={handleLogout}
                >
                    Logout
                </div>
            </div>
            <ChatEngine 
                height="clac(100vh-66px)"
                projectID={process.env.REACT_APP_CHAT_PROJECT_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
     );
}
 
export default Chats;