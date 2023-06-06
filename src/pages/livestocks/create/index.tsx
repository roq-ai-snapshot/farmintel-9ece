import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createLivestock } from 'apiSdk/livestocks';
import { Error } from 'components/error';
import { livestockValidationSchema } from 'validationSchema/livestocks';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { FarmInterface } from 'interfaces/farm';
import { getFarms } from 'apiSdk/farms';
import { LivestockInterface } from 'interfaces/livestock';

function LivestockCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: LivestockInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createLivestock(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<LivestockInterface>({
    initialValues: {
      species: '',
      health_status: '',
      created_at: new Date(new Date().toDateString()),
      updated_at: new Date(new Date().toDateString()),
      farm_id: (router.query.farm_id as string) ?? null,
    },
    validationSchema: livestockValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Livestock
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="species" mb="4" isInvalid={!!formik.errors?.species}>
            <FormLabel>Species</FormLabel>
            <Input type="text" name="species" value={formik.values?.species} onChange={formik.handleChange} />
            {formik.errors.species && <FormErrorMessage>{formik.errors?.species}</FormErrorMessage>}
          </FormControl>
          <FormControl id="health_status" mb="4" isInvalid={!!formik.errors?.health_status}>
            <FormLabel>Health Status</FormLabel>
            <Input
              type="text"
              name="health_status"
              value={formik.values?.health_status}
              onChange={formik.handleChange}
            />
            {formik.errors.health_status && <FormErrorMessage>{formik.errors?.health_status}</FormErrorMessage>}
          </FormControl>
          <FormControl id="created_at" mb="4">
            <FormLabel>Created At</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.created_at}
              onChange={(value: Date) => formik.setFieldValue('created_at', value)}
            />
          </FormControl>
          <FormControl id="updated_at" mb="4">
            <FormLabel>Updated At</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.updated_at}
              onChange={(value: Date) => formik.setFieldValue('updated_at', value)}
            />
          </FormControl>
          <AsyncSelect<FarmInterface>
            formik={formik}
            name={'farm_id'}
            label={'Select Farm'}
            placeholder={'Select Farm'}
            fetcher={getFarms}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'livestock',
  operation: AccessOperationEnum.CREATE,
})(LivestockCreatePage);
