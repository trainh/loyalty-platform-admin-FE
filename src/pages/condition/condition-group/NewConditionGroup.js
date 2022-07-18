import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Container, Button, TextField, Typography, Stack, Autocomplete } from '@mui/material';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Container as BsContainer, Row as BsRow } from 'react-bootstrap';
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';

// ----------------------------------------------------------------------

export default function NewCondition() {
  const [conditionRuleId, setConditionRule] = useState();

  const [rules, setRules] = useState([]);

  const navigate = useNavigate();

  async function getConditionRule(test) {
    try {
      const response = await axios.get(
        'http://13.232.213.53/api/v1/condition-rules/find-all',

        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setRules(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const [name, setName] = useState('');

  const [description, setDescription] = useState('');

  const conditionGroup = {
    conditionRuleId,
    name,
    description,
    status: 1,
    createdDate: format(new Date(), 'yyyy/MM/dd'),
    updateDate: format(new Date(), 'yyyy/MM/dd'),
  };

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const onSave = () => {
    console.log(conditionRuleId);
    axios
      .post('http://13.232.213.53/api/v1/condition-groups', conditionGroup, { headers })
      .then(navigate('/condition/condition-groups'));
  };

  useEffect(() => {
    getConditionRule();
  }, []);

  // "v" Must be a object

  return (
    <Page title="Condition Group">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Condition Group
          </Typography>
          <span>
            <Button
              style={{ marginRight: 5 }}
              variant="contained"
              component={RouterLink}
              to="/dashboard/condition"
              startIcon={<Iconify icon="mdi:arrow-left-thin" />}
            >
              Back
            </Button>
            <Button
              variant="contained"
              //   component={RouterLink}
              //   to="/condition/new-condition-rule"
              startIcon={<Iconify icon="mdi:content-save" />}
              onClick={onSave}
            >
              Save
            </Button>
          </span>
        </Stack>
        <BsContainer fluid>
          <BsRow>
            <Autocomplete
              // value={valueable}
              // onChange={(event, valueable) => {
              //   setValue(valueable);
              // }}
              // size="small"
              style={{ marginBottom: 15 }}
              // className="mx-1"
              options={rules}
              getOptionLabel={(option) => option.name || ''}
              onChange={(event, value) => {
                setConditionRule(value.id);
              }}
              renderInput={(params) => (
                <TextField style={{ width: 300 }} {...params} label="Condition Rule" variant="outlined" required />
              )}
            />
          </BsRow>
          <BsRow>
            <TextField
              style={{ width: 800, marginBottom: 15 }}
              id="outlined-basic"
              label="Name"
              onChange={(event) => setName(event.target.value)}
              variant="outlined"
              required
            />
          </BsRow>
          <BsRow>
            <TextField
              style={{ width: 800, marginBottom: 25 }}
              inputProps={{
                style: {
                  height: 100,
                },
              }}
              id="outlined-basic"
              label="Description"
              variant="outlined"
              onChange={(event) => setDescription(event.target.value)}
              required
              multiline
            />
          </BsRow>
        </BsContainer>
      </Container>
    </Page>
  );
}
