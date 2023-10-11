import React, { useEffect, useState } from 'react'
import './Collection.scss'
import { CiSearch } from 'react-icons/ci'
import {  useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../components/productCard/ProductCard';
import { AiOutlineDown } from 'react-icons/ai'
import Rating from '../components/productCard/Rating';
import { IoIosArrowUp } from 'react-icons/io'
import {BiSolidFilterAlt} from 'react-icons/bi'

const priceRanges = [
    { label: 'Under 999', minPrice: 0, maxPrice: 999 },
    { label: '1000 - 1999', minPrice: 1000, maxPrice: 1999 },
    { label: '2000 - 3999', minPrice: 2000, maxPrice: 3999 },
    { label: '4000 - 9999', minPrice: 4000, maxPrice: 9999 },
];


function Collection() {
    const products = useSelector(state => state.appConfigReducer.products);
    // console.log(products);
    const uniqueBrand = [...new Set(products?.map(product => product.brand))];
    

    const navigate = useNavigate();
    const [change, setChange] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [brandopen, setBrandOpen] = useState(false);
    const [priceopen, setPriceOpen] = useState(false);
    const [ratingopen, setRatingOpen] = useState(false);
    const [Products,setProducts ]=useState(products);
    const [openFilter,setOpenFilter]=useState(false);
    
    
    const params = useParams();
    



    useEffect(() => {
        // Function to filter products based on both search query and selected brands
        setProducts(products);
        const filterProducts = () => {
            let newFilteredProducts = Products;

            // Apply search query filter
            if (params === null) {
                newFilteredProducts = filterProducts
            }

            if (params.categoryId) {
                newFilteredProducts = products.filter(
                    (product) =>
                        product.name.replace(/\s/g, '').toLowerCase().includes(params.categoryId.toLowerCase()) ||
                        product.style.toLowerCase().includes(params.categoryId.toLowerCase()) ||
                        product.category.toLowerCase().includes(params.categoryId.toLowerCase())
                );
            }


            if (selectedBrands.length > 0) {
                newFilteredProducts = newFilteredProducts.filter((product) =>
                    selectedBrands.includes(product.brand)
                );
            }
            if (selectedRatings.length > 0) {
                newFilteredProducts = newFilteredProducts.filter((product) =>
                    selectedRatings.includes(product.rating)
                );
            }
            if (selectedPriceRanges.length > 0) {
               
                newFilteredProducts = newFilteredProducts.filter((product) =>
                    selectedPriceRanges.some(
                        (range) =>
                            product.price >= range.minPrice && product.price <= range.maxPrice
                    )
                );
            }

            setFilteredProducts(newFilteredProducts);
        };

        filterProducts();
    }, [change, selectedBrands, params, Products, products, selectedRatings, selectedPriceRanges]);

    const resetProducts = () => {
        setFilteredProducts(products);
        setSelectedBrands([]); // Clear selected brands
        setSelectedRatings([]);
        setSelectedPriceRanges([]);
    };

    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        console.log(query);
        setChange(query);
        // navigate(`/collection/${change}`)
    };

    const handleBrandCheckboxChange = (event) => {
        const brandName = event.target.value;

        if (selectedBrands.includes(brandName)) {
            // If the brand is already selected, remove it
            setSelectedBrands((prevSelectedBrands) =>
                prevSelectedBrands.filter((brand) => brand !== brandName)

            );
        } else {
            // If the brand is not selected, add it
            setSelectedBrands((prevSelectedBrands) => [
                ...prevSelectedBrands,
                brandName,
            ]);
        }
    };

    const toggleRating = (rating) => {
        if (selectedRatings.includes(rating)) {
            setSelectedRatings((prevSelectedRatings) =>
                prevSelectedRatings.filter((r) => r !== rating)
            );
        } else {
            setSelectedRatings((prevSelectedRatings) => [
                ...prevSelectedRatings,
                rating,
            ]);
        }
    };

    const togglePriceRange = (range) => {
        if (selectedPriceRanges.includes(range)) {
            setSelectedPriceRanges((prevSelectedRanges) =>
                prevSelectedRanges.filter((r) => r !== range)
            );
        } else {
            setSelectedPriceRanges((prevSelectedRanges) => [
                ...prevSelectedRanges,
                range,
            ]);
        }
    };



    function updatecat() {
        
        navigate(`/collection/${change.replace(/\s/g, '')}`)

    }

    function handleTogglebrand() {
        setBrandOpen(!brandopen);
    }
    function handleToggleprice() {
        setPriceOpen(!priceopen);

    }

    function handleTogglerating() {
        setRatingOpen(!ratingopen)
    }

    function handleFilterOpen(){
        setOpenFilter(!openFilter);
    }




    return (
        <div className="collection">
            <div className="inner_collection">
                <div className="search_bar">
                    <form onSubmit={updatecat}>
                        <input value={change} onChange={handleSearchInputChange} type="text" placeholder="Search.." name="search" />
                        <button type="submit"><CiSearch id='searchicon' /></button>
                    </form>
                </div>

                <div className="result_message">
                    <h1>Search result..</h1>
                </div>

                <div className="filter_and_productlist">
                        <div className="filtericon" onClick={handleFilterOpen}>
                            <BiSolidFilterAlt/>
                         </div>
                    <div className={openFilter?"filter_section":"filter_sectionc"} >
                         
                        <div className={brandopen ? "brand" : "brandc"} >
                            <div className="cardian_filter" onClick={handleTogglebrand}>
                                <h4>BRAND</h4>
                                {brandopen ? <IoIosArrowUp /> : <AiOutlineDown />}
                            </div>

                            {uniqueBrand.map((brand, index) => (
                                <>
                                    <label key={index}>
                                        <input
                                            type="checkbox"
                                            value={brand}
                                            checked={selectedBrands.includes(brand)}
                                            onChange={handleBrandCheckboxChange}
                                        />
                                        {brand}
                                    </label>
                                    <br />
                                </>
                            ))}
                            {/* <button onClick={filterProducts}>Apply Filter</button> */}
                        </div>

                        <div className={priceopen ? "brand" : "brandc"} >
                            <div className="cardian_filter" onClick={handleToggleprice}>
                                <h4>PRICE RANGE</h4>
                                {priceopen ? <IoIosArrowUp /> : <AiOutlineDown />}
                            </div>
                            {priceRanges.map((range) => (
                                <>
                                    <label key={range.label}>
                                        <input
                                            type="checkbox"
                                            value={range.label}
                                            checked={selectedPriceRanges.includes(range)}
                                            onChange={() => togglePriceRange(range)}
                                        />
                                        {range.label}
                                    </label>
                                    <br />
                                </>
                            ))}
                        </div>


                        <div className={ratingopen ? "brand" : "brandc"} >
                            <div className="cardian_filter" onClick={handleTogglerating}>
                                <h4>RATINGS</h4>
                                {ratingopen ? <IoIosArrowUp /> : <AiOutlineDown />}
                            </div>
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <>
                                    <label key={rating}>
                                        <input
                                            type="checkbox"
                                            value={rating}
                                            checked={selectedRatings.includes(rating)}
                                            onChange={() => toggleRating(rating)}
                                        />
                                        <Rating rating={rating} />
                                    </label>
                                    <br />

                                </>
                            ))}
                        </div>
                        <button className='reset' onClick={resetProducts}>Reset</button>
                    </div>
                    <div className="product_list">
                        {
                            filteredProducts?.map(product => <ProductCard key={product.id}  product={product} />)
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Collection