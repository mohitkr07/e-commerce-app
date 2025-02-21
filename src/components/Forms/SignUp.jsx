import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageTitle from "../Common_Components/PageTitle"

const SignUp = (props) => {
    const navigate = useNavigate()
    const [passAlert,setPassAlert] = useState({text:'Password',color:'black'})
    const [phoneAlert,setPhoneAlert] = useState({text:'Phone Number',color:'black'})
    const [btnText, setBtnText] = useState("Sign Up")
    const [signUpDetails, setSignUpDetails] = useState({
        first_name: "",
        last_name: "",
        Email: "",
        Password: "",
        Phone: "",
        City: "",
        Country: "",
        Address: ""
    })

    function handleChange(event) {
        setSignUpDetails({ ...signUpDetails, [event.target.name]: event.target.value })
        // console.log(signUpDetails);
    }

    function handlePass(event){
        if(event.target.value<99999){
            setPassAlert({text:'Password must be atleast 6 characters long!!',color:'red'})
        }else{
            setPassAlert({text:'Password',color:'green'})
        }
    }
    function handlePhone(event){
        if(event.target.value<999999999){
            setPhoneAlert({text:'Number must be of 10 digits!!',color:'red'})
        }else{
            setPhoneAlert({text:'Phone Number',color:'green'})
        }
    }

    const postData = async (event) => {
        event.preventDefault()
        //  Using object destructuring for first_name: signUpDetails.first_name
        const { first_name, last_name, Email, Password, Phone, City, Country, Address } = signUpDetails
        if( first_name=='' || last_name=='' || Email=='' || parseInt(Password)<99999 || parseInt(Phone)<999999999 || City=='' || Country=='') {
            setBtnText('Enter all fields!')
            setTimeout((e)=>{
                setBtnText('Sign Up')
            },2000)
            return;
        }

        const res = await fetch("/signUp", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },

            //  Converting the response to string, since our backend can only understand string
            //  The string will be sent as body to the server
            body: JSON.stringify({
                // Using object destructuring for: first_name: first_name
                first_name, last_name, Email, Password, Phone, City, Country, Address
            })
        })

        const data = await res.json()

        if (data.status === 200) {

            //  Clearing the form after submit
            setSignUpDetails({
                first_name: "",
                last_name: "",
                Email: "",
                Password: "",
                Phone: "",
                City: "",
                Country: "",
                Address: ""
            })

            setBtnText("SignUp Successful! Login To Continue.")

            //  Setting what to do after 1500 ms time
            setTimeout(() => {
                setBtnText("Sign Up")
                props.changeStateFunc()
            }, 1500)
        }
        else {
            setBtnText("SignUp Error! Try Again.")

            setTimeout(() => {
                setBtnText("Sign Up")
            }, 2000)
        }
    }

    return (
        <main>
            <section className="extra-padding blue-bg">
                <div className="container">

                    <PageTitle
                        title="Sign Up"
                        desc="Sign Up to proceed..."
                    ></PageTitle>

                    {/* In forms, name filed is very Important, because it is used in 'req.body.' while connecting to database */}
                    <form method="post" className="form-style">

                        <div className="d-flex justify-content-between flex-wrap">

                            <div className="col-12 col-sm-5 mb-3 d-flex flex-column p-0">
                                <label><b>First Name</b></label>
                                <input type="text" id="first_name" placeholder="John" value={signUpDetails.first_name} name="first_name" onChange={handleChange} required />
                            </div>

                            <div className="col-12 col-sm-5 mb-3 d-flex flex-column p-0">
                                <label><b>Last Name</b></label>
                                <input type="text" id="last_name" placeholder="Carter" value={signUpDetails.last_name} name="last_name" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="mb-3 d-flex flex-column">
                            <label><b>Email</b></label>
                            <input type="email" id="email" name="Email" value={signUpDetails.Email} placeholder='johncarter@gmail.com' onChange={handleChange} required />
                        </div>

                        <div className="mb-3 d-flex flex-column">
                            <label style={{color:`${passAlert.color}`}}><b>{passAlert.text}</b></label>
                            <input type="password" id="password" name="Password" value={signUpDetails.Password} onChange={(e)=>{handleChange(e);handlePass(e)}} required />
                        </div>

                        <div className="mb-3 d-flex flex-column">
                            <label style={{color:`${phoneAlert.color}`}}><b>{phoneAlert.text}</b></label>
                            <input maxLength={10} type="tel" id="phone" name="Phone" placeholder='1234567890' value={signUpDetails.Phone} onChange={(e)=>{handleChange(e);handlePhone(e)}} required />
                        </div>

                        <div className="d-flex justify-content-between flex-wrap">

                            <div className="col-12 col-sm-5 mb-3 d-flex flex-column p-0">
                                <label><b>City</b></label>
                                <input type="text" id="city" placeholder="Los Angeles" value={signUpDetails.City} name="City" onChange={handleChange} required />
                            </div>

                            <div className="col-12 col-sm-5 mb-3 d-flex flex-column p-0">
                                <label><b>Country</b></label>
                                <input type="text" id="country" placeholder="USA" name="Country" value={signUpDetails.Country} onChange={handleChange} required />
                            </div>
                        </div>


                        <div className="d-flex justify-content-center">
                            <button className="btn-normal" type="submit" style={btnText === "SignUp Successful! Login To Continue." ? { background: "#01966e" } : { background: "#e1775d" }} onClick={postData}>{btnText}</button>
                        </div>

                        <div className="d-flex justify-content-center align-items-center mt-3">
                            <p className="align-middle my-0 me-2">Already have an account?</p>

                            <button className="btn-normal btn-bg-grey" type="submit" onClick={props.changeStateFunc}>Login</button>
                        </div>
                    </form>

                </div>
            </section>
        </main>

    )
}

export default SignUp