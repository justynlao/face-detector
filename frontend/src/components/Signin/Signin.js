import React, {useState} from 'react'

const Signin = ({ onRouteChange, loadUser }) => {
    const [signInEmail, setSignInEmail] = useState();
    const [signInPassword, setsignInPassword] = useState();

    const onEmailChange = (event) => {
        setSignInEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setsignInPassword(event.target.value);
    }

    const onSubmitSignIn = () => {
        fetch('https://polar-brushlands-44871.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    loadUser(user);
                    onRouteChange('home')
                }
            })
    }

    return (
        <article className="br3 ba b--black-30 bg-black-30 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 white">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black-50 white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange={onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black-50 white w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            className="b ph3 pv2 input-reset b--solid white bg-black-50 grow pointer f5 dib"
                            type="submit"
                            value="Sign in"
                            onClick={onSubmitSignIn}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p  onClick={() => onRouteChange('register')} className="f5 link dim white b db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>
    )
}

export default Signin
