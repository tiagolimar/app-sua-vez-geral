const CategoriaSelect = ({ categorias, selectedCategoria, onChange }) => {
    const handleCategoriaChange = (e) => {
        const selectedValue = e.target.value;
        onChange(selectedValue);
        localStorage.setItem('favoriteCategory', selectedValue);
        location.reload();
    };

    return (
        <div className="w-100">
            <label htmlFor="categoriaSelect" className="form-label fw-semibold pb-0">Stand:</label>
            <select 
                id="categoriaSelect" 
                className="form-select border-black w-100" 
                value={selectedCategoria} 
                onChange={handleCategoriaChange}
            >
                {categorias.map(categoria => (
                    <option 
                        key={categoria.id} 
                        value={categoria.name} 
                    >
                        {categoria.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoriaSelect;