import React from 'react'
import { Row } from 'react-bootstrap'
import MainNavbar from './Navbar'
import { routes } from '../../routes'
import { Route, Routes } from 'react-router-dom'
import Alert from '../../stories/alert/Alert'
import { useSelector } from "react-redux";
import { RootState } from '../../app/store'

const Layout = () => {
    const alertStatus = useSelector((state: RootState) => state.alertStatus);
    
    return (
        <>
            {alertStatus.text !== null && alertStatus.variant !== null ?
                <Row>
                    <Alert text={alertStatus.text} variant={alertStatus.variant} />
                </Row> : null}
            <Row>
                <MainNavbar />
            </Row>
            <Row style={{ alignContent: 'center', marginLeft: '8rem', marginRight: '8rem', marginTop: '3rem' }}>
                <Routes>
                    {routes.map((route, id) => (
                        <Route
                            key={id}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </Row>
        </>
    )
}

export default Layout