import React from 'react'
import styles from './styles.module.scss'
import { signIn, signOut, useSession } from 'next-auth/react'
import {FiX} from 'react-icons/fi'
import {FaGithub} from 'react-icons/fa'

export function SignInButton(){
    const {data:session} = useSession()
    return session 
    ? (
        <button 
            className={styles.signInButton} 
            type="button"
            onClick={()=> signOut()}
        >
            <FaGithub color="#04d361"/>
            {session.user?.name}
            <FiX color="#737380" className={styles.closeIcon}/>
            
        </button>
    ):(
        <button 
            className={styles.signInButton} 
            type="button"
            onClick={()=> signIn('github')}
        >
            <FaGithub color="#eba417"/>
            Sign In with Github
        </button>
    )
    
}