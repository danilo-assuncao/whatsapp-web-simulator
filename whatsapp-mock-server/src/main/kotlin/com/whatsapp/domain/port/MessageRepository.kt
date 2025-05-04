package com.whatsapp.domain.port

import com.whatsapp.domain.model.Message

interface MessageRepository {
    fun save(message: Message): Message
    fun findAll(): List<Message>
}
