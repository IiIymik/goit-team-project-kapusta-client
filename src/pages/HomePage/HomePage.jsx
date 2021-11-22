import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';
import PagesBg from '../styles/PagesBg';
import Header from '../../components/Header/Header';
import ToReports from '../../components/ToReports/ToReports';
import Balance from '../../components/Balance/Balance';
import Transactions from '../../components/Transactions/Transactions';
import MobileBtnCont from '../../components/shared/MobileBtnCont/MobileBtnCont';
import Container from '../../components/shared/Container/Container';
import MobileTable from '../../components/MobileTable/MobileTable';
import FormInfo from '../../components/FormInfo/FormInfo';
import { categoryGoods, categoryIncomes } from '../../components/FormInfo/categoryForSelect';
import { transactionSelectors } from '../../redux/transactions';
import { useMediaQuery } from '../../components/hooks/useMediaQuery';
import CalendarPicker from '../../components/shared/Calendar/CalendarPicker';

function HomePageMarkUp() {
  const [clickOn, setClickOn] = useState('');
  const [date, setDate] = useState(new Date());
  const [toggleBtnIn, setToggleBtnIn] = useState(false);
  const [toggleBtnEx, setToggleBtnEx] = useState(false);
  const transactions = useSelector(transactionSelectors.getTransactions);
  const isMatches = useMediaQuery('(min-width: 768px)');

  const handleDateSelection = day => setDate(day);

  // useEffect(() => {
  //   switch (clickOn) {
  //     case 'expense':
  //       setToggleBtn(true);
  //       break;
  //     case 'income':
  //       setToggleBtn(true);
  //       break;
  //     default:
  //       setToggleBtn(false);
  //       break;
  //   }
  // }, [clickOn]);

  const handelBtn = e => {
    const currentType = e.target.dataset.type;
    setClickOn(currentType);
    if (currentType === 'expense') {
      setToggleBtnEx(state => !state);
      setToggleBtnIn(false);
    }
    if (currentType === 'income') {
      setToggleBtnIn(state => !state);
      setToggleBtnEx(false);
    }
  };

  return (
    <>
      <Header />
      <PagesBg />
      <main className={styles.main}>
        {!toggleBtnIn ||
          (!toggleBtnEx && (
            <Container>
              <div className={styles.homePageMenu}>
                <Link to="/" className={styles.homePageToReports}>
                  <ToReports />
                </Link>
                <Balance />
                {!isMatches && (
                  <div className={styles.calendar}>
                    <CalendarPicker onSelect={handleDateSelection} />
                  </div>
                )}
              </div>
              {isMatches && (
                <section className={styles.homePageTransactCont}>
                  <Transactions />
                </section>
              )}
              {!isMatches && (
                <div className={styles.mobileTableWrapper}>
                  <MobileTable transactions={transactions} />
                </div>
              )}
            </Container>
          ))}
      </main>
      {toggleBtnEx && (
        <FormInfo categories={categoryGoods} text="Категория товара" transactionType={clickOn} />
      )}
      {toggleBtnIn && (
        <FormInfo categories={categoryIncomes} text="Категория дохода" transactionType={clickOn} />
      )}
      <div className={styles.mobileBtn}>
        <MobileBtnCont handelBtn={handelBtn} />
      </div>
    </>
  );
}

export default HomePageMarkUp;
