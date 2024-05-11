interface ItemsLayoutProps {
    children: React.ReactNode;
}

const ItemsLayout: React.FC<ItemsLayoutProps> = ({ children }) => {
    return <div className="px-20 pt-10">{children}</div>;
};
export default ItemsLayout;
