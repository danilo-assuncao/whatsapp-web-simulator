package com.whatsapp.domain.model

import kotlinx.serialization.*
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import java.time.Instant

@Serializable
data class Message(
    @SerialName("user_id")
    val userId: String,
    val message: String,
    @Serializable(with = InstantSerializer::class)
    val timestamp: Instant
) : Comparable<Message> {
    init {
        validate()
    }

    private fun validate() {
        require(userId.isNotBlank()) { "User ID cannot be blank" }
        require(message.isNotBlank()) { "Message cannot be blank" }
    }

    override fun compareTo(other: Message): Int {
        return this.timestamp.compareTo(other.timestamp)
    }
}

@OptIn(ExperimentalSerializationApi::class)
private object InstantSerializer : KSerializer<Instant> {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("Instant", PrimitiveKind.STRING)

    override fun serialize(encoder: Encoder, value: Instant) {
        encoder.encodeString(value.toString())
    }

    override fun deserialize(decoder: Decoder): Instant {
        val value = decoder.decodeString()
        return try {
            Instant.parse(value)
        } catch (e: Exception) {
            throw SerializationException("Invalid timestamp format. Expected ISO-8601 format (e.g., '2024-05-02T18:30:00.000Z')")
        }
    }
}
