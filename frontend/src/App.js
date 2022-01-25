import React, {useState} from 'react';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceDetection from './components/FaceDetection/FaceDetection';
import './App.css';



// Parameters for Particles background effects
const particlesOptions = {
  particles: {
    number: {
      value: 75,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  })

  const clearState = () => {
    setInput('');
    setImageUrl('');
    setBox({});
    setRoute('signin');
    setIsSignedIn(false);
    setUser({ ...user,
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    })
  }

  const loadUser = (data) => {
    setUser({ ...user,
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      })
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: clarifaiFace.top_row * height,  // % distance from the top
      leftCol: clarifaiFace.left_col * width,  // % distance from the left
      bottomRow: height - (clarifaiFace.bottom_row * height),  // % distance from the bottom, so subtract from image height
      rightCol: width - (clarifaiFace.right_col * width)  // % distance from the right, so subtract from image width
    }
  }

  const outlineFace = (box) => setBox(box);

  const onInputChange = (event) => setInput(event.target.value);

  const onImageSubmit = () => {
    setImageUrl(input);
      fetch('https://polar-brushlands-44871.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://polar-brushlands-44871.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id 
            })
          })
            .then(response => response.json())
            .then(count => {
              setUser({...user, entries: count})
            })
            .catch(console.log)
        }
        outlineFace(calculateFaceLocation(response))
      })
      .catch(console.log);
  }

  const onRouteChange = (route) => {
    if (route === 'signin') {
      clearState();
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  return (
    <div className="App">
      <Particles className='particles' params={particlesOptions}/>
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      { route === 'home'
        ? <div>
            <p className='f2 b white'>Face Detector</p>
            <Logo />
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm 
              onInputChange={onInputChange} 
              onImageSubmit={onImageSubmit}
            />
            <FaceDetection imageUrl={imageUrl} box={box} />
          </div>
        : ( route === 'signin'
            ? <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
            : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
          )
      }
    </div>
  );
}

export default App;
