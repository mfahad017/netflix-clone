import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import db from '../../../Firebase/firebase'
import { selectUser } from '../../../Redux/userSlice'
import {loadStripe} from '@stripe/stripe-js'

function Plans({setCurrentPlan}) {

    const [products, setProducts] = useState(null)

    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null)

    
    useEffect (()=>{
        db.collection('products')
        .where('active', '==', true)
        .get()
        .then(querySnapshot =>{
            const products = {};
            querySnapshot.forEach(async productDoc =>{
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection('prices').get();
                priceSnap.docs.forEach(price =>{
                    products[productDoc.id].prices = {
                    priceId: price.id,
                    priceData: price.data()
                    }
                })
            })
            setProducts(products)
        });
    }, [])
    useEffect(() =>{
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot =>{
            querySnapshot.forEach(async subscription1 =>{
                setSubscription({
                    id:subscription1.id,
                    role: subscription1.data().role,
                    current_period_end: subscription1.data().current_period_end.seconds,
                    current_period_start: subscription1.data().current_period_start.seconds
                })
                console.log(subscription)
                    if(querySnapshot)
                    {
                        setCurrentPlan(subscription1.data().role)
                    }

            })
        })
        // eslint-disable-next-line
    }, [])
    console.log(subscription)

   const loadCheckout = async (priceId) =>{
        const docRef = await db
        .collection('customers')
        .doc(user.uid)
        .collection('checkout_sessions')
        .add({
            price:priceId,
            success_url:window.location.origin,
            cancel_url: window.location.origin,
        })
        docRef.onSnapshot(async (snap) =>{
            const {error, sessionId} = snap.data();
            if(error){
                alert(`an error occured ${error.message}`)
            }
            if(sessionId){
                const stripe = await loadStripe("pk_test_51JG0BKLXYmn2IpSgISeCDbsCNllISGA3PvEbSzBz5bpo8WTvmqI6UKCbzpxX92LKiN0hftRrobm1J6wJZPCOWSTs0081pmQFJE")
                // const deleted = await stripe.subscriptions.del(
                //     subscription.id
                //   );
                //   console.log(deleted)
                stripe.redirectToCheckout({sessionId});
            }
        })
        
    }


    return (
        <div className="profile__body__detail__subscription">
            <div className="profile__body__detail__subscription__renewal">
                {subscription ?
                    <p>Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>
                :null
                }
            </div>
            {
                products
                ?
                    Object.entries(products).map( ([prodcutId, productData]) => {
                        const isCurrentPackage = productData.name
                        ?.toLowerCase()
                        .includes(subscription?.role)
                        console.log(isCurrentPackage)
                        return (
                                <div className="profile__body__detail__subscription__plansList">
                                    <div className="profile__body__detail__subscription__plansList__listItem">
                                        <div className="profile__body__detail__subscription__plansList__listItem__info">
                                            <div className="profile__body__detail__subscription__plansList__listItem__info__heading">{productData.name}</div>
                                            <div className="profile__body__detail__subscription__plansList__listItem__info__subHeading">{productData.description}</div>
                                        </div>
                                        <button
                                        className={`profile__body__detail__subscription__plansList__listItem__button ${
                                            isCurrentPackage
                                            ?
                                                `profile__body__detail__subscription__plansList__listItem__button__currentPackage`
                                            :
                                                `profile__body__detail__subscription__plansList__listItem__button__subscribe`
                                            } `}
                                        onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}
                                        >
                                            {
                                                isCurrentPackage
                                                    ?
                                                        "CurrentPackage"
                                                    :
                                                        "Subscribe"
                                            }
                                            </button>
                                    </div>
                                </div>     
                        );
                    })
                :
                    null
            }
        </div>
    )
}

export default Plans


    