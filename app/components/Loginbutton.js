import React from 'react'

const Loginbutton = () => {
    return (
        <>
            <button className="w-fit text-nowrap group hover-effect hover:shadow-lg relative overflow-hidden border border-white rounded-full p-3 px-5 text-sm text-white bg-transparent transition-all duration-500">
                <span className="relative z-10 transition-all duration-500">
                    <span className="initial-text ">Log in</span>
                    <span className="absolute inset-0 flex items-center justify-center hover-text text-black opacity-0">Log in</span>
                </span>
            </button>

        </>
    )
}

export default Loginbutton
