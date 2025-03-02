import React, { useMemo } from "react";

const SidebarFilter = ({ productos, priceRange, maxPrice, onPriceChange }) => {
    // Calcular mínimo precio
    const minPrice = useMemo(() => {
        if (!productos?.length) return 0;
        return Math.min(...productos.map(p => p.precioProductoDto || 0));
    }, [productos]);

    const handleSliderChange = (event) => {
        onPriceChange(parseInt(event.target.value));
    };

    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light" style={{ width: "230px", height: "100%" }}>
            {/* ... mismo código de renderizado ... */}
            <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange}
                onChange={handleSliderChange}
            />
            <div className="price-range">
                <span>${minPrice.toLocaleString() || 0}</span>
                <span>${priceRange.toLocaleString() || 0}</span>
            </div>
        </div>
    );
};
export default SidebarFilter;
