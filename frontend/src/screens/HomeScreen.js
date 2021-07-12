import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products')
            
            setProducts(data)
        }

        fetchProducts()
    }, [])

    const renderProdcuts = products.map((product) => {
        return (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
            </Col>
        )
    })

    return (
        <>
            <h1>Latest products</h1>
            <Row>{renderProdcuts}</Row>
        </>
    )
}

export default HomeScreen
