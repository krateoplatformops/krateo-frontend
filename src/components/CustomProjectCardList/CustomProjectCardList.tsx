import { useEffect, useState } from "react";
import { getBaseUrl, getHeaders } from "../../utils/api";
import { Avatar, Card, Col, Row, Space, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { formatISODate } from "../../utils/dateTime";
import { getColorCode } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import useCatchError from "../../utils/useCatchError";

const CustomProjectCardList = ({data}) => {
  const endpoint = "/call?uri=/apis/composition.krateo.io";
  const [cards, setCards] = useState<any[]>([]);
  const navigate = useNavigate();
  const { catchError } = useCatchError();

  useEffect(() => {
    const getCards = async () => {
      const arrCards: any[] = [];
      try {
        await Promise.all(data.versions?.map(async (v) => {
          const endpointVersion = `${endpoint}/${v.version}`;
          const dataNames = await fetch(`${getBaseUrl()}${endpointVersion}`, {headers: getHeaders()});
          const names = await dataNames.json();
  
          await Promise.all(names?.resources?.map(async (n) => {
            const endpointNames = `${endpointVersion}/${n.name}`;
            const dataCardList = await fetch(`${getBaseUrl()}${endpointNames}`, {headers: getHeaders()});
            const cardList = await dataCardList.json();
            
            cardList.items?.forEach(card => {
              arrCards.push(card);
            })
          }));
        }));
        setCards(arrCards);
      } catch (error) {
        catchError(null, "result");
      }
    }

    if (data !== undefined) getCards();
  }, [data]);

  return (
    <Row>
      {cards.map(c => (
        <Col xs={24} sm={12} key={`Col_${c.metadata.uid}`}>
          <Card
            key={c.metadata.uid}
            onClick={() => navigate(`/compositions/${c.metadata.uid}`)}
            className={styles.card}
            title={
              <Space size="large" className={styles.header}>
                <Avatar size={64} style={{ backgroundColor: getColorCode("blue") }} icon={<FontAwesomeIcon icon={"server" as IconProp} />} />
                <div className={styles.details}>
                  <Typography.Title className={styles.title} ellipsis level={2} title={c.metadata.name}>{c.metadata.name}</Typography.Title>
                  <Space className={styles.subTitle}>
                    <div className={styles.date}>{formatISODate(c.metadata.creationTimestamp, true)}</div>
                  </Space>
                </div>
              </Space>
            }
            // actions={[
            //   <Space wrap key='1'>{tags?.split(",")?.map((tag, i) => <Tag key={`Tag_${i}`}>{tag}</Tag>)}</Space>,
            //   <Button key='2' onClick={(e) => {e.stopPropagation(); onDeleteAction()}} icon={<DeleteOutlined />} type="text" disabled={!isAllowed("delete")} />
            // ]}
          >
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default CustomProjectCardList;
