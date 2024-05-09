import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const api_key = import.meta.env.VITE_API_KEY;
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [attributes, setAttributes] = useState({
    url: '',
    format: 'png',
    width: 1920,
    height: 1080,
    noAds: false,
    noCookieBanners: false
  });
  const [quota, setQuota] = useState({
    remaining: 0,
    limit: 0
  })

  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${api_key}&url=https://${attributes.url}&format=${attributes.format}&width=${attributes.width}&height=${attributes.height}&no_cookie_banners=${attributes.no_cookie_banners}&no_ads=${attributes.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    return query;
  }

  const takeScreenshot = async () => {
    setLoading(true);
    try {
      const query = makeQuery();
      const response = await fetch(query);
      const json = await response.json();
      setGallery([...gallery, json.url]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  const changeAttribute = (e) => {
    const { id, value } = e.target;

    if (id === 'noAds' || id === 'noCookieBanners') {
      setAttributes({ ...attributes, [id]: e.target.checked });
    } else {
      setAttributes({ ...attributes, [id]: value });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (attributes.url === '' || !isValidHttpUrl(attributes.url)) {
      alert('Please enter a valid URL!');
      return;
    } else if (quota.remaining === 0) {
      alert('You have reached your API call limit for this month! Please try again later.');
      return;
    }

    takeScreenshot();
    reset();
  }

  const reset = () => {
    setAttributes({
      url: '',
      format: 'png',
      width: 1920,
      height: 1080,
      noAds: false,
      noCookieBanners: false
    });
  }

  const isValidHttpUrl = (string) => {
    let url;
    string = 'https://' + string;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

  const getQuota = async () => {
    try {
      const response = await fetch(`https://api.apiflash.com/v1/urltoimage/quota?access_key=${api_key}`);
      const json = await response.json();
      setQuota({ remaining: json.remaining, limit: json.limit });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getQuota();
  }, [quota]);

  return (
    <>
      <div id='screenshot'>
        <p>Remaining API calls: {quota.remaining} out of {quota.limit}</p>
        <h1>Build Your Own Screenshot! 📸</h1>
        <h3>Select Your Image Attributes: </h3>
        
        <form id='form' onSubmit={handleSubmit}>
          <div id='url' className='attribute'>
            <h3>URL</h3>
            <input type='text' id='url' placeholder='Enter a URL' value={attributes.url} onChange={changeAttribute}/>
            <p>Input a link to any website you would like to take a screenshot of. <b>Don't worry </b>
            about including https!</p>
          </div>
          <div id='format' className='attribute'>
            <h3>Format</h3>
            <select id='format' value={attributes.format} onChange={changeAttribute}>
              <option value='png'>png</option>
              <option value='jpeg'>jpeg</option>
              <option value='webp'>webp</option>
            </select>
            <p>Choose the format for your screenshot: png, jpeg, or webp. The default format is png.</p>
          </div>
          <div id='width' className='attribute'>
            <h3>Width</h3>
            <input type='number' id='width' onChange={changeAttribute} value={attributes.width} min='1' placeholder='Enter a width' />
            <p>Input a width for the screenshot (in pixels). The default value is 1920px.</p>
          </div>
          <div id='height' className='attribute'>
            <h3>Height</h3>
            <input type='number' id='height' value={attributes.height} onChange={changeAttribute} min='1' placeholder='Enter a height'/>
            <p>Input a height for the screenshot (in pixels). The default value is 1080px.</p>
          </div>
          <div id='no_ads' className='attribute'>
            <h3>No Ads</h3>
            <input type='checkbox' id='noAds' onChange={changeAttribute} checked={attributes.noAds} /> No Ads
            <p>Check this box if you would like your screenshot <b>without ads</b>.</p>
          </div>
          <div id='no_cookie_banners' className='attribute'>
            <h3>No Cookie Banners</h3>
            <input type='checkbox' id='noCookieBanners' onChange={changeAttribute} checked={attributes.noCookieBanners}/> No Cookie Banners
            <p>Check this box if you would like your screenshot <b>without</b> those annoying 
            "allow cookies" banners.</p>
          </div>

          <button type='submit'>Take Screenshot! 📸</button>
        </form>

        <div id='gallery'>
          <h2>Your Screenshot Gallery!</h2>
          {loading ? <p>Taking new screenshot...</p> : null}
          {gallery.length === 0 ? <p>No screenshots yet! Take one above!</p> : 
            <div id='gallery-images'>
              {gallery.map((url, index) => (
                <img className='image' key={index} src={url} alt='screenshot' />
              ))}
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default App;
