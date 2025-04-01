export const processTextractResponse = (data) => {
    const keyMap = {};
    const valueMap = {};
    const blockMap = {};
  
    // Populate block maps
    data.Blocks.forEach((block) => {
      blockMap[block.Id] = block;
      if (block.BlockType === "KEY_VALUE_SET") {
        if (block.EntityTypes.includes("KEY")) {
          keyMap[block.Id] = block;
        } else {
          valueMap[block.Id] = block;
        }
      }
    });
  
    // Extract only specific key-value pairs
    const fieldsToExtract = ["Name Of Candidate", "Father's/Guardian's name", "Mother's name", "Roll No."];
    const keyValuePairs = {};
  
    Object.values(keyMap).forEach((keyBlock) => {
      const key = getText(keyBlock, blockMap);
  
      // Only process fields we're interested in
      if (fieldsToExtract.includes(key)) {
        const valueBlock = findValueBlock(keyBlock, valueMap);
        const value = getText(valueBlock, blockMap);
        if (key && value) {
          keyValuePairs[key] = value;
        }
      }
    });
  
    return keyValuePairs;
  };
  
  const findValueBlock = (keyBlock, valueMap) => {
    if (!keyBlock.Relationships) return null;
    for (const relationship of keyBlock.Relationships) {
      if (relationship.Type === "VALUE") {
        for (const valueId of relationship.Ids) {
          return valueMap[valueId];
        }
      }
    }
    return null;
  };
  
  const getText = (block, blockMap) => {
    if (!block || !block.Relationships) return "";
    let text = "";
    for (const relationship of block.Relationships) {
      if (relationship.Type === "CHILD") {
        for (const childId of relationship.Ids) {
          const childBlock = blockMap[childId];
          if (childBlock.BlockType === "WORD") {
            text += `${childBlock.Text} `;
          } else if (
            childBlock.BlockType === "SELECTION_ELEMENT" &&
            childBlock.SelectionStatus === "SELECTED"
          ) {
            text += "X ";
          }
        }
      }
    }
    return text.trim();
  };
  