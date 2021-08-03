import SelectIcon from '@assets/icons/select.svg'
import { cloneDeep } from 'lodash'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface Item {
  id: string;
  name: string;
}

interface Props {
  data: Item[];
  onChange?: (ids: string[]) => void;
  defaultSelectedIds: string[];
}

const GridMultiSelect = (props: Props) => {
  const { data, onChange, defaultSelectedIds } = props
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  console.log(selectedIds)
  useEffect(() => {
    setSelectedIds(defaultSelectedIds)
  }, [defaultSelectedIds])

  const handleSelectedItem = (item: Item, isSelected: boolean) => {
    if (!isSelected) {
      const newSelectedIds = cloneDeep(selectedIds).filter(
        (el) => el !== item.id
      )
      onChange && onChange(newSelectedIds)
      return setSelectedIds(newSelectedIds)
    }

    const newSelectedIds = [...selectedIds, item.id]
    onChange && onChange(newSelectedIds)
    setSelectedIds(newSelectedIds)
  }

  return (
    <StyledGridMultiSelect>
      {data.map((el, idx) => (
        <GridSelectedItem
          key={el.id}
          selected={selectedIds.includes(el.id)}
          dataItem={el}
          handleSelectedItem={handleSelectedItem}
        />
      ))}
    </StyledGridMultiSelect>
  )
}

export default GridMultiSelect

const GridSelectedItem = (props: {
  selected: boolean;
  dataItem: Item;
  handleSelectedItem: (item: Item, isSelected: boolean) => void;
}) => {
  const { selected, dataItem, handleSelectedItem } = props

  const handleChangeSelectedItem = () => {
    handleSelectedItem(dataItem, !selected)
  }

  return (
    <div onClick={handleChangeSelectedItem}>
      {dataItem.name}
      {selected && <SelectIcon />}
    </div>
  )
}

const StyledGridMultiSelect = styled.div`
  & div {
    position: relative;
    min-width: 180px;
    padding: 5px 10px;
    border-radius: 2px;
    cursor: pointer;

    &:hover {
      background-color: #ebebe0;
    }

    & svg {
      width: 18px;
      height: 18px;
      position: absolute;
      right: 0;

      & path {
        fill: #000;
        opacity: 0.5;
      }
    }
  }
`
