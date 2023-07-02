# Работа с изображениями

Для работы с изображениями создан кастомный компонент **AppImage**. Находится в *shared/ui*.

Компонент умеет обрабатывать процесс загрузки изображения, а также ошибку при загрузке.

Во время загрузки показывается **fallback**, при ошибке вместо изображения показывается **errorFallback**. Оба компонента передаются пропсами.

Код компонента:
``` js
export const AppImage = memo((props: AppImageProps) => {
  const {
    className,
    alt = 'image',
    src,
    fallback,
    errorFallback,
    ...otherProps
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src ?? '';
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  if (hasError && errorFallback) {
    return (
      <div>
        {errorFallback}
      </div>
    );
  }

  if (isLoading && fallback) {
    return fallback;
  }

  return (
    <div
      className={classNames(
        cls.container,
        className,
      )}
      {...otherProps}
    >
      <img
        src={src}
        alt={alt}
      />
    </div>
  );
});
```