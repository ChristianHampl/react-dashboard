import {useState} from 'react'
import { getUserStyles } from './user_styles.jsx';


export default function UserData({name, img, status, display, theme}){

    const styles = getUserStyles(display, theme)

      return (
    <div style={styles.container}>
      <h2 style={styles.name}>Willkommen, {name}</h2>

      <div
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...styles.img,
        }}
      ></div>

      <div style={styles.status}>{status}</div>
    </div>
  );
}