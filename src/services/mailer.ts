import sendgrid from '@sendgrid/mail'
import { MailData } from '@sendgrid/helpers/classes/mail'
import config from '~/config'
import { Omit } from 'src/types'

sendgrid.setApiKey(config.email.token);

const send = async (data: Omit<MailData, 'from'>) => sendgrid.send({
  from: config.email.from,
  ...data,
} as MailData)

export default {
  send
}
