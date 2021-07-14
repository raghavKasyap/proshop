import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

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
            {loading ? (
                <Loader />
            ) : error ? (
                <Message varaint="danger">{error}</Message>
            ) : (
                <Row>{renderProdcuts}</Row>
            )}
        </>
    )
}

export default HomeScreen
