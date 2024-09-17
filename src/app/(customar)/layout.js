import Footer from '@/components/footer/Footer'
import Mininav from '@/components/movilenav/Mininav'
import Navber from '@/components/webnav/Navber'
import React from 'react'

function HomeLayout({ children }) {
    return (
        <div>
            <Navber />
            {children}
            <Mininav />
            <Footer />
        </div>
    )
}

export default HomeLayout