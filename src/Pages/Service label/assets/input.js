import { forwardRef, useCallback } from 'react';
import {
  Input,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
export default forwardRef(function ChakraTagInput(
  {
    tags = [],
    placeholder,
    onTagsChange,
    onTagAdd,
    onTagRemove,
    vertical = false,
    addKeys = ['Enter'],
    wrapProps,
    wrapItemProps,
    tagProps,
    tagLabelProps,
    tagCloseButtonProps,
    ...props
  },
  ref
) {
  const addTag = useCallback(
    (event, tag) => {
      onTagAdd?.(event, tag);
      if (event.isDefaultPrevented()) return;

      onTagsChange?.(event, tags.concat([tag]));
    },
    [tags, onTagsChange, onTagAdd]
  );
  const removeTag = useCallback(
    (event, index) => {
      onTagRemove?.(event, index);
      if (event.isDefaultPrevented()) return;

      onTagsChange?.(event, [
        ...tags.slice(0, index),
        ...tags.slice(index + 1),
      ]);
    },
    [tags, onTagsChange, onTagRemove]
  );
  const handleRemoveTag = useCallback(
    index => event => {
      removeTag(event, index);
    },
    [removeTag]
  );
  const onKeyDown = props.onKeyDown;
  const handleKeyDown = useCallback(
    event => {
      onKeyDown?.(event);

      if (event.isDefaultPrevented()) return;
      if (event.isPropagationStopped()) return;

      const { currentTarget, key } = event;
      const { selectionStart, selectionEnd } = currentTarget;
      if (addKeys.indexOf(key) > -1 && currentTarget.value) {
        addTag(event, currentTarget.value);
        if (!event.isDefaultPrevented()) {
          currentTarget.value = '';
        }
        event.preventDefault();
      } else if (
        key === 'Backspace' &&
        tags.length > 0 &&
        selectionStart === 0 &&
        selectionEnd === 0
      ) {
        removeTag(event, tags.length - 1);
      }
    },
    [addKeys, tags.length, addTag, removeTag, onKeyDown]
  );

  return (
    <Wrap align="center" {...wrapProps}>
      {tags.map((tag, index) => (
        <WrapItem {...maybeCall(wrapItemProps, false, index)} key={index}>
          <ChakraTagInputTag
            onRemove={handleRemoveTag(index)}
            tagLabelProps={maybeCall(tagLabelProps, tag, index)}
            tagCloseButtonProps={maybeCall(tagCloseButtonProps, tag, index)}
            colorScheme={props.colorScheme}
            size={props.size}
            {...maybeCall(tagProps, tag, index)}
          >
            {tag}
          </ChakraTagInputTag>
        </WrapItem>
      ))}
      <WrapItem flexGrow={1} {...maybeCall(wrapItemProps, true, tags.length)}>
        <Input
          placeholder={placeholder}
          {...props}
          onKeyDown={handleKeyDown}
          ref={ref}
        />
      </WrapItem>
    </Wrap>
  );
});

function ChakraTagInputTag({
  children,
  onRemove,

  tagLabelProps,
  tagCloseButtonProps,

  ...props
}) {
  const onTagCloseButtonClick = tagCloseButtonProps?.onClick;
  const handleClickTagCloseButton = useCallback(
    event => {
      onTagCloseButtonClick?.(event);
      if (event.isDefaultPrevented()) return;

      onRemove?.(event);
    },
    [onRemove, onTagCloseButtonClick]
  );
  return (
    <Tag {...props}>
      <TagLabel {...tagLabelProps}>{children}</TagLabel>
      <TagCloseButton
        {...tagCloseButtonProps}
        onClick={handleClickTagCloseButton}
      />
    </Tag>
  );
}

function maybeCall(maybeFunc, ...args) {
  if (typeof maybeFunc === 'function') {
    return maybeFunc(...args);
  } else {
    return maybeFunc;
  }
}
