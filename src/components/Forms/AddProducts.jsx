import React from 'react'
import PageTitle from "../Common_Components/PageTitle"

const AddProducts = (props) => {
    return (
        <main>
            <section className="card-block dark-bg">
                <div className="container">

                    <PageTitle
                        title="Add Products"
                        desc="Insert Product Details..."
                    ></PageTitle>

                    {/* In forms, name filed is very Important, because it is used in 'req.body.' while connecting to database */}
                    <form method="post" className="card-style" action="/signUp">

                        <div className="row">
                            <div className="mb-3"><label className="form-label" ><strong>Product Name</strong></label><input className="form-control" type="text" placeholder="Jacket" name="product" /></div>

                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label" ><b>Category</b></label>
                                    <input className="form-control item" type="text" name="category" placeholder='Fashion' />
                                </div>
                            </div>

                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label" ><b>Price ($) </b></label>
                                    <input className="form-control item" type="number" placeholder='$20' name="price" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label"><b>Ratings</b></label>
                                    <input className="form-control item" type="number" min={0} max={5} id="phone" name="Phone" placeholder='0 to 5' />
                                </div>
                            </div>

                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label"><b>Offers (% Off)</b></label>
                                    <input className="form-control item" type="number" name="offer" placeholder='50% Off' min={10} max={100} />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label"><b>Image</b></label>
                            <input className="form-control item" type="text" name="image" placeholder='Add Image URL' />
                        </div>

                        <div className="mb-3">
                            <label className="form-label"><b>Description</b></label>

                            <textarea className="form-control" name="desc" cols="30" rows="2" placeholder='Product Description Here'></textarea>

                        </div>

                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary" type="submit">Add Product</button>
                        </div>

                    </form>

                </div>
            </section>
        </main>

    )
}

export default AddProducts