import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { EOS_CLOUD_OUTLINED, EOS_FOLDER_OPEN, EOS_SETTINGS } from 'eos-icons-react';
import Progressbar from 'react-js-progressbar';

const Header = () => {
  const [percentage, setPercentage] = useState(50);

  const change_progressbar_input = () => {
    setPercentage(50);
  };
  const { currentUser, logOut } = useAuth()
  
  async function handleLogOut(){
    await logOut()
  }
  
  const navigate = useNavigate()
  const routeChange = (url) =>{ 
    navigate(url);
  }
  
  return (
    <>
    {currentUser &&
      <div className="left_bar">
        <div className="logo">
          <EOS_CLOUD_OUTLINED size={"xxxl"} color={"#FFFFFF"}/>
          <h1>CloudSC</h1>
        </div>
        <div className="left_list">
          <div className="list_element">
            <div className="left_icon"> 
              <EOS_FOLDER_OPEN color={"#FFFFFF"} size={"xxl"}/>
            </div>
            <div className="left_name">Files</div>
          </div>
          <div className="list_element">
            <div className="left_icon"> 
              <EOS_SETTINGS color={"#FFFFFF"} size={"xxl"}/>
            </div>
            <div className="left_name">Settings</div>
          </div>
        </div>
        <div className="left_bottom">
          <div className="info"></div>
          <div className="outer_progress">
            <div className="circle_grey"></div>
            <div className="circle_blue"></div>
            <div className="square"></div>
            <div id='progressbarContainer'>
              <Progressbar input={70} clockwise={false} pathWidth={10} size="50%" pathColor={['#FD9C66', '#FD9C66']} trailWidth={10} trailColor='#2295FF' textStyle={{ fill: '#FD9C66',fontWeight:"bold",fontSize: '50px' }} shape="arc" pathLinecap=""/>
              <div className="size">
                4,0 / 5GB
              </div>
              <div className="more_space">
                Add more space
              </div>
            </div>
          </div>
        </div>
      </div>
    }

    {!currentUser &&
      <div className="header-top">
        <div className="head-top-logo">
          <EOS_CLOUD_OUTLINED size={"xxl"} color={"#FFFFFF"}/>
          <h1>CloudSC</h1>
        </div>

        <div className="buttons">
          <button className="head-top-button-login"></button>
          <button className="head-top-button-register"></button>
        </div>
      </div>
    }
    </>
  )
}

export default Header