import React from 'react'
import { Link } from "react-router-dom";

export default function errorPage() {
  return (
    <>
        <h1>404</h1>
        <p className="bodyText">
            We couldn't find the page you are looking for:( <br />
            Try returning to the homepage and navigate using the buttons!
        </p>
        <Link to={"/"}>
            Return to homepage
        </Link>
    </>
  )
}
