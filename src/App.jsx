import { useState } from 'react';
import './App.css'

function App() {
  return (
    <>
      <div id='screenshot'>
        <h1>Build Your Own Screenshot! 📸</h1>
        <h3>Select Your Image Attributes: </h3>

        <form id='form'>
          <div id='url' className='attribute'>
            <h3>URL</h3>
            <input type='text' id='url-input' placeholder='Enter a URL' />
            <p>Input a link to any website you would like to take a screenshot of. <b>Don't worry </b>
            about including https or any other protocol!</p>
          </div>
          <div id='format' className='attribute'>
            <h3>Format</h3>
            <select id='format-input'>
              <option value='png'>png</option>
              <option value='jpeg'>jpeg</option>
              <option value='webp'>webp</option>
            </select>
            <p>Choose the format for your screenshot: png, jpeg, or webp.</p>
          </div>
          <div id='width' className='attribute'>
            <h3>Width</h3>
            <input type='number' id='width-input' placeholder='Enter a width' />
            <p>Input a width for the screenshot (in pixels).</p>
          </div>
          <div id='height' className='attribute'>
            <h3>Height</h3>
            <input type='number' id='height-input' placeholder='Enter a height' />
            <p>Input a height for the screenshot (in pixels).</p>
          </div>
          <div id='no_ads' className='attribute'>
            <h3>No Ads</h3>
            <input type='checkbox' id='no-ads-input' /> No Ads
            <p>Check this box if you would like your screenshot <b>without ads</b>.</p>
          </div>
          <div id='no_cookie_banners' className='attribute'>
            <h3>No Cookie Banners</h3>
            <input type='checkbox' id='no-cookie-banners-input' /> No Cookie Banners
            <p>Check this box if you would like your screenshot <b>without</b> those annoying 
            "allow cookies" banners.</p>
          </div>
        </form>
      </div>
    </>
  )
}

export default App
