import React, { useState } from 'react';
import styles from './ItemDecrip.css';
import Button from '../../../UI/Button/Button';
import SellerNote from './SellerNote/SellerNote';
import { fetchItemPublisher } from '../../../db_api/db_items';
import { timeStampToDate } from '../../../utility/time-convert';

async function fetchContactData(id) {
  return await fetchItemPublisher(id);
}
export default function ItemDescrip({
  className,
  favBtnFlag,
  onSave,
  saveBtnDisabled = true,
  ...itemProps
}) {
  const { name, price, notes, publisher, lastModifyTime, favLimit } = itemProps;
  const [showContact, contactClicked] = useState(false);
  const [pubInfo, getPubInfo] = useState(null);
  const date = timeStampToDate(lastModifyTime);
  const dateString = date ? date.toDateString() : null;

  return (
    <div className={[className, styles['container']].join(' ')}>
      <h3 style={{ fontSize: '40px' }}>{name}</h3>

      <div className={styles.price}>
        <small>Price:</small> <strong>${price}</strong>
      </div>

      <SellerNote {...{ notes }} />
      <small
        style={{
          margin: '20px 0',
          backgroundColor: '#FEE9DB',
          borderRadius: '4px',
          color: '#F70C0C',
          padding: '10px 2px'
        }}>
        Last edit date:{' '}
        <strong style={{ color: '#6DB324' }}>{dateString}</strong>
      </small>
      <div className={styles.btnGroup}>
        {favBtnFlag ? (
          <Button disabled={saveBtnDisabled} onClick={() => onSave(favBtnFlag)}>
            Unsave
          </Button>
        ) : favLimit ? (
          <Button disabled={true} onClick={() => onSave(favBtnFlag)}>
            non-premium user only can save 18 items
          </Button>
        ) : (
          <Button disabled={saveBtnDisabled} onClick={() => onSave(favBtnFlag)}>
            Save
          </Button>
        )}
        <div className={styles.dropdown}>
          <Button
            onClick={async () => {
              if (!showContact && !pubInfo) {
                const publisherData = await fetchContactData(
                  publisher,
                  showContact
                );
                getPubInfo(publisherData);
              }
              contactClicked(!showContact);
            }}
            style={{ width: '100%' }}
            className='btn succeed'>
            Contact Seller
          </Button>
          {showContact && (
            <div className={styles.dropdownContent}>
              <small>Seller:</small>
              <p>{pubInfo['username']}</p>

              <small>Email:</small>
              <input
                defaultValue={pubInfo['email']}
                type='email'
                name='seller-email'
              />
              <small>Tel:</small>
              <p> {pubInfo['tel']}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
