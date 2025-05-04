package com.whatsapp.adapters.outbound.repository

import com.whatsapp.domain.model.Message
import com.whatsapp.domain.port.MessageRepository
import java.util.*

class InMemoryMessageRepository : MessageRepository {
    private val messages = Collections.synchronizedSet(TreeSet<Message>())

    override fun save(message: Message): Message {
        messages.add(message)
        return message
    }

    override fun findAll(): List<Message> {
        return messages.toList()
    }
}
