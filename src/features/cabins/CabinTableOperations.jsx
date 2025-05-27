import React from 'react'
import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'

const CabinTableOperations = () => {
    return (
        <TableOperations>
            <Filter filterField='discount' options={[
                { value: "all", label: "Hepsi" },
                { value: "discount", label: "İndirimli" },
                { value: "no-discount", label: "İndirimsiz" },
            ]} />
            <SortBy options={[
                { value: "name-asc", label: "Alfabetik Artan (A-Z)" },
                { value: "name-desc", label: "Alfabetik Azalan (Z-A)" },
                { value: "regularPrice-asc", label: " Artan Fiyat" },
                { value: "regularPrice-desc", label: " Azalan Fiyat" },
                { value: "maxCapacity-asc", label: " Artan Kapatise" },
                { value: "maxCapacity-desc", label: " Azalan Kapatise" },

            ]} />
        </TableOperations>
    )
}

export default CabinTableOperations